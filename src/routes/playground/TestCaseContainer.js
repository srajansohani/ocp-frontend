import React, { useEffect } from "react";
import { Button, Input, Segmented, Tooltip } from "antd";
import { useState } from "react";
import { CloseOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import TextArea from "antd/es/input/TextArea";


export const TestCaseContainer = ({ setIsResult, segment, isResult, setSegment, testcases, setTestcases }) => {

    const handleRemoveTestCase = (index) => {
        const updatedTestCases = testcases.filter((_, i) => i !== index);
        setTestcases(updatedTestCases);
    };
    useEffect(()=>{
        testcases.forEach((element,index) => {
            if(element._id === currentTestCase._id){
                setCurrentTestCase(element);
            }
        });
    },[isResult])
    const renderSegmentLabel = (tc, index) => (
        <span className="flex items-center">
            Test Case {index + 1}
           {(segment === 'Testcase') && <CloseOutlined
                onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveTestCase(index);
                }}
                className="hover:h-2 w-2 mb-5 ml-3"
            />}
        </span>
    );

    console.log(testcases);

    const [currentTestCase, setCurrentTestCase] = useState({});

    useEffect(()=>{
        if(testcases.length > 0){
            setCurrentTestCase(testcases[0]);
        }
    },[])
    return <>
        <div>
            <div className="mb-0 flex flex-row">
                <Segmented
                    options={['Testcase', 'Testresult']}
                    value={segment}
                    onChange={(value) => {
                        setSegment(value);
                    }}
                />
            </div>
            <div className="mb-5">
                {testcases && <Segmented
                    options={[
                        ...testcases.map((testcase, index) => {
                            return {
                                label: (
                                    renderSegmentLabel(testcase, index)
                                ),
                                value: testcase
                            }
                        })
                    ]}
                    onChange={(value) => {
                        setCurrentTestCase(value)
                    }}
                />}
                {((segment === 'Testcase')) && <PlusCircleOutlined onClick={() => {
                    setTestcases([...testcases, {
                        ...testcases[testcases.length - 1],
                    }])
                }} />}
            </div>
            {(currentTestCase) &&

                <div>
                    <div className=" mb-2 h-80">
                        {(segment === 'Testresult') ?
                        <div>
                            <p>Output:</p> 
                            <Input 
                                value={currentTestCase?.test_case?.output ? atob(currentTestCase?.test_case?.output) : " "}
                                contentEditable={false}
                            />

                            <div>
                            <p>Expected_</p>
                            <Input 
                                value={currentTestCase?.test_case?.expected_output ? atob(currentTestCase?.test_case?.expected_output) : " "}
                                contentEditable={false}
                            />
                            </div>
                            </div>
                            
                            
                            : 
                        

                        <p>Input: <Input
                            value={currentTestCase?.test_case?.input ? atob(currentTestCase?.test_case?.input) : " "}
                            onChange={async(event)=>{
                                console.log(event.target.value)
                                setCurrentTestCase({
                                    ...currentTestCase,
                                    test_case: {
                                        ...currentTestCase.test_case,
                                        input: btoa(event.target.value)
                                    }
                                })
                                setTestcases([...testcases.map((testcase,index)=>{
                                    if(testcase._id === currentTestCase._id){
                                        return {
                                            ...currentTestCase,
                                            test_case: {
                                                ...currentTestCase.test_case,
                                                input: btoa(event.target.value)
                                            }
                                        };
                                    }
                                    return testcase;
                                })])
                            }}
                        />{}</p>}
                    </div>

                </div>}
        </div>
    </>
}

{/* <div className="shadow-md border-solid">
                <div className="flex flex-row flex space-x-60">
                    <div>Testcases</div>
                    <Button 
                        onClick={()=>{
                            setTestcases([...testcases,{input: ""}]);
                            console.log(testcases)
                        }}
                    >
                        Add
                    </Button>
                </div>
                <div className="flex flex-row space-x-6">
                {
                    (testcases) && testcases.map((testcase,index)=>{
                        return (
                            <div>
                                <div>
                                    Case {index}
                                </div>
                                <Input 
                                    id={index}
                                    value={testcase.input}
                                    onChange={(value)=>{
                                        const tests = [...testcases];
                                        tests[index].input = value?.input;
                                        setTestcases([...tests]);
                                    }}
                                    
                                    suffix={
                                        <Tooltip title="Extra information">
                                          <MinusCircleOutlined 
                                          onClick={()=>{
                                            const newArray = [...testcases];
                                            newArray.splice(index, 1);
                                            setTestcases(newArray);

                                          }}
                                           style={{ color: 'rgba(0,0,0,.45)' }} />
                                        </Tooltip>
                                      }
                                />
                            </div>
                        )
                    })
                }
                </div>
            </div> */}