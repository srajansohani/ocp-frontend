import React, { useEffect } from "react";
import { Input, Segmented } from "antd";
import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import Text from "antd/es/typography/Text";
import TextArea from "antd/es/input/TextArea";

export const TestCaseContainer = ({
    segment,
    setSegment,
    testcases,
    setTestcases,
    submissionError,
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

    useEffect(() => {
        console.log(testcases);
    }, [testcases]);

    const renderSegmentLabel = (tc, tcIndex) => (
        <div className="py-2 px-4 relative">
            <Text onClick={() => setIndex(index)}>Test Case {tcIndex + 1}</Text>
            {segment === "Testcase" && (
                <CloseOutlined
                    onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveTestCase(tcIndex);
                    }}
                    className="absolute w-3 h-3 p-0.5 rounded-full top-1 right-[-4px] hover:bg-[#8a8a8a]  hover:text-white"
                />
            )}
        </div>
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
        <div className="p-8">
            <div className="mb-0 flex flex-row">
                <Segmented
                    options={["Testcase", "Testresult"]}
                    value={segment}
                    onChange={(value) => {
                        setSegment(value);
                    }}
                />
            </div>
            {!testcases[index].test_case.output && segment === "Testresult" ? (
                <></>
            ) : (
                <div className="mb-5 mt-0">
                    {testcases && (
                        <Segmented
                            options={[
                                ...testcases.map((testcase, index) => {
                                    return {
                                        label: renderSegmentLabel(
                                            testcase,
                                            index
                                        ),
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
            )}
            {testcases && (
                <>
                    {segment === "Testresult" ? (
                        submissionError ? (
                            <div className="flex w-full h-full justify-center align-middle p-4">
                                <TextArea
                                    rows={8}
                                    disabled={true}
                                    style={{ color: "#000" }}
                                    value={submissionError}
                                />
                            </div>
                        ) : testcases[index].test_case.output ? (
                            <>
                                <Text>{"Output :"}</Text>
                                <TextArea
                                    value={atob(
                                        testcases[index].test_case.output
                                    )}
                                    contentEditable={false}
                                    className="mb-5"
                                    style={{ padding: "0.5rem" }}
                                />
                                <Text>{"Expected Output :"}</Text>
                                <TextArea
                                    value={atob(
                                        testcases[index].test_case
                                            .expected_output
                                    )}
                                    contentEditable={false}
                                    style={{ padding: "0.5rem" }}
                                />
                            </>
                        ) : (
                            <div className="flex w-full h-full justify-center align-middle p-8">
                                <Text>
                                    You need run/submit before you can view the
                                    results
                                </Text>
                            </div>
                        )
                    ) : (
                        <>
                            <Text>{"Input :"}</Text>
                            <TextArea
                                name="input"
                                value={atob(testcases[index].test_case.input)}
                                onChange={(event) => {
                                    changeTestCase(event);
                                }}
                                className="mb-5"
                                style={{ padding: "0.5rem" }}
                            />
                            <Text>{"Expected Output :"}</Text>
                            <TextArea
                                name="expected_output"
                                value={atob(
                                    testcases[index].test_case.expected_output
                                )}
                                onChange={(event) => {
                                    changeTestCase(event);
                                }}
                                style={{ padding: "0.5rem" }}
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
