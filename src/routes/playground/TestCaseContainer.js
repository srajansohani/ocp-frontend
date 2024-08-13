import React from "react";
import { Button, Input, Segmented, Tooltip } from "antd";
import { useState } from "react";
import { CloseOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import TextArea from "antd/es/input/TextArea";


export const TestCaseContainer = ({setIsResult, segment,isResult,setSegment,testcases, setTestcases }) => {

    const handleRemoveTestCase = (index) => {
        const updatedTestCases = testcases.filter((_, i) => i !== index);
        setTestcases(updatedTestCases);
      };
    
    const renderSegmentLabel = (tc,index) => (
        <span className="flex items-center">
          Test Case {index + 1}
          <CloseOutlined
            onClick={(e) => {
              e.stopPropagation(); 
              handleRemoveTestCase(index);
            }}
            style={{ marginLeft: 8, fontSize: '0.75rem', color: '#f5222d', cursor: 'pointer' }}
          />
        </span>
      );

    console.log(testcases);

    
    const [currentTestCase, setCurrentTestCase] = useState({});
    return <>
        <div>
            <div className="mb-0 flex flex-row">
                <Segmented
                    options={['Testcase','Testresult']}
                    value={segment}
                    onChange={(value) => { 
                        setSegment(value);
                        setIsResult(false);
                    }}
                />
            </div>
            <div className="mb-5">
                <Segmented
                    options={[
                        ...testcases.map((testcase,index)=>{
                            return {
                                label: (
                                    renderSegmentLabel(testcase,index)
                                ),
                                value: testcase
                            }
                        })
                    ]}
                    onChange={(value)=>{
                        setCurrentTestCase(value)
                    }}
                />
                <PlusCircleOutlined onClick={()=>{
                    setTestcases([...testcases,{
                        ...testcases[testcases.length - 1],
                        _id: Math.random().toString(36).substr(2, 9) + '-' + Date.now().toString(36)
                    }])
                }} />
            </div>
            {(currentTestCase) && 

                <div>
                    <div className=" mb-2 h-80">
                        {isResult && (isResult === true) ? <p>Output: {currentTestCase?.test_case?.output ? atob(currentTestCase?.test_case?.output) : " "}</p> : <p>Input: {currentTestCase?.test_case?.input ? atob(currentTestCase?.test_case?.input) : " "}</p> }
                           
                    </div>
                    <div>
                        <p>Expected_</p>
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