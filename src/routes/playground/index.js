import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { Button, message, Select, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { CODE_STUBS } from "../../utils/constants";
import axiosInstance from "../../utils/axiosConfig";

export const Playground = () => {
    const [code, setCode] = useState("");
    const [language, setLanguage] = useState('cpp');
    const [output, setOutput] = useState("");
    const [input, setInput] = useState("");
    const [loader, setLoader] = useState(false);

    const intervalRef = useRef(null);
    const deleteSubmission = async(id)=>{
        try {
            const res = await axiosInstance.delete(`/submission/playground?submission_id=${id}`);
            console.log(res.data.message);
        }
        catch(error){
            message.error(error.message);
        }
    }
    const check = async (id) => {
        try {
            const res = await axiosInstance.get(
                `/submission?submission_id=${id}&type=playground_submission`
            );
            const data = res.data;
            if (data?.status !== "pending") {
                clearInterval(intervalRef.current);

                if (data.status === "failed") {
                    const decoded_output = data.error;
                    setLoader(false);
                    setOutput(decoded_output);
                    return;
                }

                const decoded_output = atob(data?.output);
                setLoader(false);
                setOutput(decoded_output);
                deleteSubmission(id);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(()=>{
        if(code.length === 0){
            setCode(CODE_STUBS[language])
        }
    },[language])
    const onRun = async () => {
        const encoded_code = btoa(code);
        const encoded_input = btoa(input);
        const submission = {
            language: language,
            code: encoded_code,
            input: encoded_input,
        };
        console.log(submission);

        const res = await axiosInstance.post("/submission/playground", submission);
        const data = res.data;
        setLoader(true);
        intervalRef.current = setInterval(() => check(data._id), 500);
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
                            onClick={onRun}
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
                    {loader ? (
                        <Spin />
                    ) : (
                        <TextArea
                            onChange={(event) => {
                                console.log(event.target.value);
                                setInput(event.target.value);
                            }}
                            style={{
                                height: "400px",
                            }}
                        />
                    )}

                    <div>
                        <p className="shadow-md text-2xl mb-3 mt-2 ">
                            Output:{" "}
                        </p>
                        <TextArea
                            // dangerouslySetInnerHTML={{ __html: output }}
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
