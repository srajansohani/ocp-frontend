import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { Button, message, Select, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { CODE_STUBS } from "../../utils/constants";
import axiosInstance from "../../utils/axiosConfig";
import { LoadingOutlined } from "@ant-design/icons";

export const Playground = () => {
    const [code, setCode] = useState("");
    const [language, setLanguage] = useState("cpp");
    const [output, setOutput] = useState("");
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const intervalRef = useRef(null);
    const deleteSubmission = async (id) => {
        try {
            const res = await axiosInstance.delete(
                `/submission/playground?submission_id=${id}`
            );
            console.log(res.data.message);
        } catch (error) {
            message.error(error.message);
        }
    };
    const check = async (id) => {
        try {
            const res = await axiosInstance.get(
                `/submission?submission_id=${id}&type=playground_submission`
            );
            const data = res.data;
            if (data?.status !== "pending") {
                clearInterval(intervalRef.current);
                setLoading(false);

                if (data.status === "failed") {
                    const decoded_output = data.error;
                    setOutput(decoded_output);
                    return;
                }

                const decoded_output = atob(data.output);
                setOutput(decoded_output);
                deleteSubmission(id);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (code.length === 0) {
            setCode(CODE_STUBS[language]);
        }
    }, [language]);
    const onRun = async () => {
        const encoded_code = btoa(code);
        const encoded_input = btoa(input);
        const submission = {
            language: language,
            code: encoded_code,
            input: encoded_input,
        };
        console.log(submission);

        const res = await axiosInstance.post(
            "/submission/playground",
            submission
        );
        const data = res.data;
        setLoading(true);
        intervalRef.current = setInterval(() => check(data._id), 1000);
    };
    return (
        <>
            <div className="flex">
                <div className="basis-1/2">
                    <div className="flex flex-row justify-between">
                        <Select
                            placeholder="select a language"
                            options={[
                                { value: "cpp", label: <span>C++</span> },
                                { value: "java", label: <span>Java</span> },
                                { value: "python", label: <span>Pyhton</span> },
                            ]}
                            value={language}
                            onSelect={(value) => {
                                setLanguage(value);
                            }}
                            className="mt-4 mb-3 w-40"
                        />
                        <Button
                            className="mt-4 mb-3 bg-blue-400 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
                            onClick={onRun}
                            disabled={loading ? true : false}
                        >
                            Run Code
                        </Button>
                    </div>
                    <Editor
                        height="100vh"
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
                </div>
                <div className="basis-1/2 ml-2">
                    <p className="shadow-md text-2xl mb-3 mt-2 ">Input: </p>
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
                    <TextArea
                        onChange={(event) => {
                            console.log(event.target.value);
                            setInput(event.target.value);
                        }}
                        style={{
                            height: "400px",
                        }}
                    />

                    <div>
                        <p className="shadow-md text-2xl mb-3 mt-2 ">
                            Output:{" "}
                        </p>
                        <TextArea
                            value={output}
                            contentEditable={false}
                            style={{
                                height: "400px",
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
