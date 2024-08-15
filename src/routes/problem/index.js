import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProblemComponent from "../../components/ProblemComponent";
import { Editor, loader } from "@monaco-editor/react";
import { TestCaseContainer } from "../../components/TestCaseContainer";
import { Select, Button, Input, Spin } from "antd";
import { CODE_STUBS } from "../../utils/constants";

export const Problem = () => {
    const [problem, setProblem] = useState();
    const [searchParams, setSearchParams] = useSearchParams();
    const [language, setLanguage] = useState("cpp");
    const [code, setCode] = useState("");
    const [testcases, setTestcases] = useState([]);
    const [segment, setSegment] = useState("Testcase");
    const [loading, setLoading] = useState(false);
    const intervalRef = useRef(null);

    useEffect(()=>{
        if(code.length === 0){
            setCode(CODE_STUBS[language])
        }
    },[language])
    const check = async (id) => {
        try {
            const res = await fetch(
                `http://localhost:8000/submission?sumbission_id=${id}&type=problem_submission`
            );
            const data = await res.json();
            console.log(data);
            if (data?.status === "submitted") {
                clearInterval(intervalRef.current);
                setTestcases([...data?.test_cases]);
                setLoading(false);
                setSegment("Testresult");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const runCode = async () => {
        const encoded_code = btoa(code);
        const submission = {
            problem_id: searchParams.get("problem_id"),
            user_id: "66b8b3bcf33aeaa14257f243",
            language: language,
            code: encoded_code,
            type: "run",
            test_cases: testcases,
        };
        console.log(submission);

        const res = await fetch("http://localhost:8000/submission", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(submission),
        });
        const data = await res.json();
        console.log(data);
        intervalRef.current = setInterval(() => check(data._id), 5000);
        setLoading(true);
    };

    const fetchProblem = async (problem_id) => {
        const res = await axios.get(
            `http://localhost:8000/problem?problem_id=${problem_id}`
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
                    <div className="flex flex-row justify-between">
                        <Select
                            placeholder="select a language"
                            options={[
                                { value: "cpp", label: <span>C++</span> },
                                { value: "java", label: <span>java</span> },
                                { value: "python", label: <span>pyhton</span> },
                            ]}
                            value={language}
                            onSelect={(value) => {
                                setLanguage(value);
                            }}
                            className="mt-4 mb-3 w-40"
                        />
                        <Button
                            className="mt-4 mb-3 bg-blue-400 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
                            onClick={runCode}
                        >
                            Run Code
                        </Button>
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
                    <div className="bg-white border border-gray-300 rounded-lg shadow-lg space-y-6">
                        {loading ? (
                            <Spin />
                        ) : (
                            <>
                                {problem && (
                                    <TestCaseContainer
                                        segment={segment}
                                        setSegment={setSegment}
                                        setTestcases={setTestcases}
                                        testcases={testcases}
                                    />
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
