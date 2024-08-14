import { Input, Segmented } from "antd";
import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import Title from "antd/es/typography/Title";

import React from "react";
import { Typography } from "antd";

const { Text } = Typography;

export const TestCaseContainer = ({
    segment,
    setSegment,
    testcases,
    setTestcases,
}) => {
    const [index, setIndex] = useState(0);

    const handleRemoveTestCase = (index) => {
        if (testcases.length > 1) {
            const updatedTestCases = testcases.filter((_, i) => i !== index);
            // console.log(updatedTestCases);
            setTestcases(updatedTestCases);
            setIndex(0);
            return;
        }
        console.log("display a toast to say cant remove all testcases");
    };

    const renderSegmentLabel = (tc, tcIndex) => (
        <span className="flex items-center" onClick={() => setIndex(index)}>
            Test Case {tcIndex + 1}
            {segment === "Testcase" && (
                <CloseOutlined
                    onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveTestCase(tcIndex);
                    }}
                    className="hover:h-2 w-2 mb-5 ml-3"
                />
            )}
        </span>
    );

    const changeTestCase = async (event) => {
        setTestcases((prevState) => {
            const temp = prevState.map((tc, tcIndex) => {
                if (tcIndex === index) {
                    const temp = tc;
                    temp.test_case[event.target.name] = btoa(
                        event.target.value
                    );
                    console.log(
                        event.target.value,
                        temp.test_case[event.target.name]
                    );

                    return temp;
                }
                return tc;
            });

            return temp;
        });
    };

    return (
        <div className="p-4">
            <div className="mb-0 flex flex-row">
                <Segmented
                    options={
                        testcases[0].test_case.output
                            ? ["Testcase", "Testresult"]
                            : ["Testcase"]
                    }
                    value={segment}
                    onChange={(value) => {
                        setSegment(value);
                    }}
                />
            </div>
            <div className="mb-5 mt-0">
                {testcases && (
                    <Segmented
                        options={[
                            ...testcases.map((testcase, index) => {
                                return {
                                    label: renderSegmentLabel(testcase, index),
                                    value: index,
                                    // key: index,
                                };
                            }),
                        ]}
                        onChange={(value) => {
                            setIndex(value);
                        }}
                    />
                )}
                {segment === "Testcase" && (
                    <PlusCircleOutlined
                        onClick={() => {
                            setTestcases([
                                ...testcases,
                                {
                                    test_case: {
                                        input: "",
                                        expected_output: "",
                                    },
                                },
                            ]);
                        }}
                    />
                )}
            </div>
            {testcases && (
                <>
                    {segment === "Testresult" ? (
                        <>
                            <Text>{"Output :"}</Text>
                            <Input
                                value={atob(testcases[index].test_case.output)}
                                contentEditable={false}
                                className="mb-5"
                            />
                            <Text>{"Expected Output :"}</Text>
                            <Input
                                value={atob(
                                    testcases[index].test_case.expected_output
                                )}
                                contentEditable={false}
                            />
                        </>
                    ) : (
                        <>
                            <Text>{"Input :"}</Text>
                            <Input
                                name="input"
                                value={atob(testcases[index].test_case.input)}
                                onChange={(event) => {
                                    changeTestCase(event);
                                }}
                                className="mb-5"
                            />
                            <Text>{"Expected Output :"}</Text>
                            <Input
                                name="expected_output"
                                value={atob(
                                    testcases[index].test_case.expected_output
                                )}
                                onChange={(event) => {
                                    changeTestCase(event);
                                }}
                            />
                        </>
                    )}
                </>
            )}
        </div>
    );
};

// {
//     /* <div className="shadow-md border-solid">
//                 <div className="flex flex-row flex space-x-60">
//                     <div>Testcases</div>
//                     <Button
//                         onClick={()=>{
//                             setTestcases([...testcases,{input: ""}]);
//                             console.log(testcases)
//                         }}
//                     >
//                         Add
//                     </Button>
//                 </div>
//                 <div className="flex flex-row space-x-6">
//                 {
//                     (testcases) && testcases.map((testcase,index)=>{
//                         return (
//                             <div>
//                                 <div>
//                                     Case {index}
//                                 </div>
//                                 <Input
//                                     id={index}
//                                     value={testcase.input}
//                                     onChange={(value)=>{
//                                         const tests = [...testcases];
//                                         tests[index].input = value?.input;
//                                         setTestcases([...tests]);
//                                     }}

//                                     suffix={
//                                         <Tooltip title="Extra information">
//                                           <MinusCircleOutlined
//                                           onClick={()=>{
//                                             const newArray = [...testcases];
//                                             newArray.splice(index, 1);
//                                             setTestcases(newArray);

//                                           }}
//                                            style={{ color: 'rgba(0,0,0,.45)' }} />
//                                         </Tooltip>
//                                       }
//                                 />
//                             </div>
//                         )
//                     })
//                 }
//                 </div>
//             </div> */
// }
