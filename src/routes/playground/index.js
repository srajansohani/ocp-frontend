import React, { useRef, useState } from 'react';
import { Editor } from '@monaco-editor/react'
import { Button, Select } from 'antd'
import { TestCaseContainer } from './TestCaseContainer';

export const Playground = () => {
    const [code, setCode] = useState("");
    const [language, setLanguage] = useState();
    const [testcases,setTestcases] = useState([{
        input: ""
    }]);
    const [submission,setSubmission] = useState({});
    const intervalRef = useRef(null);
    const getSubmission = async(id)=>{
        const res = await fetch(`http://localhost:8000/problem?problem_id=${id}`);
        const updatedSubmission = res.json();
        return updatedSubmission;
    }
    const check = async(id)=>{
         try{
            
            const res = await fetch(`http://localhost:8000/submission/check?sumbission_id=${id}`);
            const data = await res.json();
            console.log(submission);
            if(submission?.status === "submitted"){
                // console.log(data);
                clearInterval(intervalRef.current);
                const updatedSubmission = await getSubmission(id);
                setSubmission((prevSubmission) => ({
                    ...prevSubmission,
                    ...submission,
                    ...updatedSubmission
                }));
            }
         }
         catch(error){
            console.log(error);
         }
    }
    const onRun = async()=>{
        const encoded_test_cases = testcases.map((testcase)=>({
            test_case: {
                input: btoa(testcase.input)
            }
        }))
        const encoded_code = btoa(code)
        const submission = {
            problem_id: "66b8cb82c3e2be756d882eb7",
            user_id: "66b8b3bcf33aeaa14257f243",
            language: language,
            code: encoded_code,
            type: "run",
            test_cases: encoded_test_cases
        }
        console.log(submission);

        const res = await fetch('http://localhost:8000/submission',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submission)
        })
        const data  = await res.json();
        console.log(data);
        setSubmission((prevSubmission) => ({
            ...prevSubmission,
            ...submission,
            ...data
        }));
        intervalRef.current = setInterval(()=>check(data._id),5000);
    }
    return <>
        <h1>Playground</h1>
        <div className='flex flex-row'>
            <div className='basis-1/2'>
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
                    className='my-2'
                />
                <Editor
                    height="50vh"
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
                <br />
                <div className='mb-0 flex flex-row'>
                    <TestCaseContainer
                        testcases={testcases}
                        setTestcases={setTestcases}
                        submission={submission}
                    className="border-2 shadow-xl" />
                    <Button onClick={onRun} >
                        Run
                    </Button>
                </div>
                
            </div>
            <div className='basis-1/2'>

            </div>
        </div>
    </>
}
