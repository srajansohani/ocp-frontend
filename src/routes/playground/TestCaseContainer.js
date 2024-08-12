import React from "react";
import { Button, Input,Segmented,Tooltip } from "antd";
import { useState } from "react";
import {MinusCircleOutlined, PlusCircleOutlined} from '@ant-design/icons'
import TextArea from "antd/es/input/TextArea";

class Testcase {
     input
     expected_output
     isHidden = false
     score=0

     Testcase(input,expected_output=null,isHidden=false,score=0){
        this.input = input;
        this.expected_output = expected_output;
        this.isHidden = isHidden
        this.score=0
     }
}
export const TestCaseContainer = ({submission,testcases,setTestcases})=>{
        const [segment,setSegment] = useState("Testcase");
        console.log(testcases);
        if(submission?.status === "submitted"){
            setSegment("Testresult");
        }
        return <>
        <div>
            <div className="mb-0 flex flex-row">
                <Segmented 
                    options={['Testcase','Testresult']}
                    value={segment}
                    onChange={(value)=>{setSegment(value)}}
                />
            </div>
            {(segment === "Testcase") ? 
            
            <div className="mb-0 flex flex-row">
                <div className="mb-0 flex flex-row">
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
                <PlusCircleOutlined
                className="mb-10"
                 onClick={()=>{
                            setTestcases([...testcases,{input: ""}]);
                            console.log(testcases)
                        }} />
                </div>
            : 
            <div className="mb-0 flex flex-row">
                <div className="mb-0 flex flex-row">
                {
                    (testcases) && testcases.map((testcase,index)=>{
                        return (
                            <div>
                                <div>
                                    Case {index}
                                </div>
                                <TextArea value={submission?.test_cases[index]?.test_case?.output} />
                            </div>
                        )
                    })
                }
                </div>
                <PlusCircleOutlined
                className="mb-10"
                 onClick={()=>{
                            setTestcases([...testcases,{input: ""}]);
                            console.log(testcases)
                        }} />
                </div>
            }
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