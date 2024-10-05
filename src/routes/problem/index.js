import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProblemComponent from "./ProblemComponent";
import { Editor } from "@monaco-editor/react";
import { TestCaseContainer } from "./TestCaseContainer";
import { Select, Button, Spin, Space, message } from "antd";
import { CODE_STUBS } from "../../utils/constants";
import axiosInstance from "../../utils/axiosConfig";
import { LoadingOutlined } from "@ant-design/icons";
import Text from "antd/es/typography/Text";

export const Problem = () => {
    const [problem, setProblem] = useState();
    const [searchParams, setSearchParams] = useSearchParams();
    const [language, setLanguage] = useState("cpp");
    const [code, setCode] = useState("");
    const [testcases, setTestcases] = useState([]);
    const [segment, setSegment] = useState("Testcase");
    const [loading, setLoading] = useState(false);
    const [submissionError, setSbumissionError] = useState(undefined);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (code.length === 0) {
            setCode(CODE_STUBS[language]);
        }
    }, [language]);

    const deleteThrowawaySubmission = async (submission_id) => {
        try {
            await axiosInstance.delete(
                `/submission?submission_id=${submission_id}`
            );
        } catch (err) {
            console.log(err);
        }
    };

    const check = async (id) => {
        try {
            const res = await axiosInstance.get(
                `/submission?submission_id=${id}&type=problem_submission`
            );
            const data = res.data;

            if (data.status === "submitted") {
                clearInterval(intervalRef.current);
                setSbumissionError(data.error);
                setTestcases([...data.test_cases]);
                setLoading(false);
                setSegment("Testresult");

                if (data.throwaway) {
                    if (data.error) {
                        message.error(
                            `Your submission resulted in ${data.result}`,
                            5
                        );
                    }
                    deleteThrowawaySubmission(data._id);
                    return;
                }

                if (data.result === "AC") {
                    message.success(
                        `You have succefully solved ${problem.title} !!`,
                        5
                    );
                    return;
                }

                message.error(`Your submission resulted in ${data.result}`, 5);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const validateTestcases = () => {
        let valid = true;
        testcases.forEach((test_case, index) => {
            console.log(test_case.test_case);
            if (
                !test_case.test_case.input.length ||
                !test_case.test_case.expected_output.length
            ) {
                message.error(
                    `Inupt or Expected-output cannot be empty in test case ${
                        index + 1
                    }`
                );
                valid = false;
            }
        });

        return valid;
    };

    const runCode = async () => {
        if (!validateTestcases()) {
            return;
        }
        const encoded_code = btoa(code);
        const submission = {
            problem_id: searchParams.get("problem_id"),
            language: language,
            code: encoded_code,
            type: "run",
            test_cases: testcases,
        };

        const res = await axiosInstance.post(
            "http://localhost:8000/submission",
            submission
        );
        const data = res.data;
        intervalRef.current = setInterval(
            () => check(data.submission_id),
            2000
        );

        setLoading(true);
    };

    const submitCode = async () => {
        const encoded_code = btoa(code);
        const submission = {
            problem_id: searchParams.get("problem_id"),
            language: language,
            code: encoded_code,
            type: "submit",
        };
        let res;

        if (searchParams.get("contest_id")) {
            res = await axiosInstance.post("http://localhost:8000/submission", {
                ...submission,
                contest_id: searchParams.get("contest_id"),
            });
        } else {
            res = await axiosInstance.post(
                "http://localhost:8000/submission",
                submission
            );
        }

        const data = res.data;
        intervalRef.current = setInterval(
            () => check(data.submission_id),
            2000
        );

        setLoading(true);
    };

    const fetchProblem = async (problem_id) => {
        const res = await axiosInstance.get(
            `/problem?problem_id=${problem_id}`
        );
        setProblem(res.data);

        setTestcases([
            ...res.data.testcases.map((testcase) => ({
                test_case: {
                    input: testcase?.input,
                    expected_output: testcase?.expected_output,
                },
            })),
        ]);
    };

    useEffect(() => {
        fetchProblem(searchParams.get("problem_id"));
    }, [searchParams]);

    return (
        <>
            <div className="flex">
                <div className="basis-2/5">
                    <ProblemComponent className="basis-1/2" problem={problem} />
                </div>
                <div className="basis-3/5">
                    <div className="flex flex-row justify-between  my-4 px-4">
                        <Select
                            placeholder="select a language"
                            options={[
                                { value: "cpp", label: <Text>C++</Text> },
                                { value: "java", label: <Text>java</Text> },
                                { value: "python", label: <Text>pyhton</Text> },
                            ]}
                            value={language}
                            onSelect={(value) => {
                                setLanguage(value);
                            }}
                            className="w-40 justify-"
                        />
                        <Space>
                            <Button
                                className=" bg-[#1F2937] hover:bg-blue-600 text-white p-5 rounded-lg shadow-md transition duration-300"
                                onClick={runCode}
                                disabled={loading ? true : false}
                            >
                                Run Code
                            </Button>
                            <Button
                                className=" bg-[#1F2937] hover:bg-blue-600 text-white p-5 rounded-lg shadow-md transition duration-300"
                                onClick={submitCode}
                                disabled={loading ? true : false}
                            >
                                Submit
                            </Button>
                        </Space>
                    </div>
                    <Editor
                        height="50vh"
                        theme="vs-dark"
                        defaultLanguage=""
                        language={language}
                        defaultValue="//start writing here"
                        onMount={() => {}}
                        value={code}
                        onChange={(value) => {
                            setCode(value);
                        }}
                    />
                    <div className="bg-white border border-gray-300 rounded-b-lg shadow-lg">
                        {loading && (
                            <div className="fixed h-screen w-screen bg-[#00000050] top-0 left-0 flex justify-center align-top z-10">
                                <Spin
                                    indicator={
                                        <LoadingOutlined
                                            style={{
                                                fontSize: 78,
                                                zIndex: 11,
                                                top: "50%",
                                            }}
                                            spin
                                        />
                                    }
                                />
                            </div>
                        )}
                        {problem && (
                            <TestCaseContainer
                                segment={segment}
                                setSegment={setSegment}
                                setTestcases={setTestcases}
                                testcases={testcases}
                                submissionError={submissionError}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
