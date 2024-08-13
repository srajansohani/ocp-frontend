import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@monaco-editor/react'
import { Button, Select } from 'antd'
import { TestCaseContainer } from './TestCaseContainer';
import TextArea from 'antd/es/input/TextArea';
import { initPanelComponentToken } from 'antd/es/date-picker/style';

export const Playground = () => {
    const [code, setCode] = useState("");
    const [language, setLanguage] = useState();
    const [output,setOutput] = useState("");
    const [input,setInput] = useState("");

    const intervalRef = useRef(null);
    const check = async (id) => {
        try {

            const res = await fetch(`http://localhost:8000/submission?sumbission_id=${id}&type=playground_submission`);
            const data = await res.json();
            if (data?.status === "submitted") {
                // console.log(data);
                clearInterval(intervalRef.current);
                const decoded_output = atob(data?.output);
                setOutput(decoded_output);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    const onRun = async () => {
        const encoded_code = btoa(code);
        const encoded_input = btoa(input);
        const submission = {
            language: language,
            code: encoded_code,
            input: encoded_input
        }
        console.log(submission);

        const res = await fetch('http://localhost:8000/submission/playground', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submission)
        })
        const data = await res.json();
        intervalRef.current = setInterval(() => check(data._id), 500);
    }
    return <>
        <div className='flex'>
            <div className='basis-1/2'>
              <div className='flex flex-row justify-between'>
              <Select
                        placeholder="select a language"
                        options={[
                            { value: 'cpp', label: <span>C++</span> },
                            { value: 'java', label: <span>java</span> },
                            { value: 'python', label: <span>pyhton</span> }
                        ]}
                        value={language}
                        onSelect={(value) => {
                            setLanguage(value);
                        }}
                        
                        className='mt-4 mb-3 w-40'
                    />
                <Button className="mt-4 mb-3 bg-blue-400 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300" onClick={onRun}>Run Code</Button>
              </div>
              <Editor
                    height="100vh"
                    theme='vs-dark'
                    defaultLanguage=''
                    language={language}
                    defaultValue='//start writing here'
                    onMount={() => {

                    }}
                    value={code}
                    onChange={(value) => {
                        setCode(value);
                    }}
                />
            </div>
            <div className='basis-1/2 ml-2'>
                <p className='shadow-md text-2xl mb-3 mt-2 ' >Input: </p>
                <TextArea
                    onChange={(event)=>{
                        console.log(event.target.value)
                        setInput(event.target.value);
                    }}
                    style={{
                        height: "400px"
                       }}
                />
                <div>
                    <p className='shadow-md text-2xl mb-3 mt-2 ' >Output: </p>
                    <TextArea
                        value={output}
                       contentEditable={false}
                       style={{
                        height: "400px"
                       }}
                    />
                </div>
            </div>
        </div>
    </>
}
