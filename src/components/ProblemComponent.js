import Title from "antd/es/typography/Title";
import React from "react";
import { Space, Typography } from "antd";
import { XFilled } from "@ant-design/icons";

const { Text } = Typography;

const ProblemComponent = ({ problem }) => {
    return (
        <>
            {problem && (
                <div className="p-4">
                    <Title>{problem.title}</Title>
                    <Title level={5}>Description : </Title>
                    <Text>{problem.desc}</Text>
                    {problem.input_format && (
                        <>
                            {" "}
                            <Title level={5}>Input Format : </Title>
                            <Text>{problem.input_format}</Text>
                        </>
                    )}
                    {problem.output_format && (
                        <>
                            <Title level={5}>Output Fromat : </Title>
                            <Text>{problem.output_format}</Text>
                        </>
                    )}
                    <Title level={5}>Constraints : </Title>
                    {problem.constraints.map((constraint) => {
                        return (
                            <>
                                <Space>
                                    <XFilled
                                        style={{
                                            fontSize: "16px",
                                            color: "#545554",
                                        }}
                                    />
                                    {constraint}
                                </Space>{" "}
                            </>
                        );
                    })}
                    <>
                        {problem.testcases?.map((testcase, index) => {
                            return (
                                <div className="mb-5 mt-5" key={index}>
                                    <div className=" border rounded-lg p-4 ">
                                        <div className="flex justify-between items-center mb-2">
                                            <Title
                                                level={5}
                                                className="text-lg font-semibold text-gray-800"
                                            >
                                                {" "}
                                                Example {index + 1}:
                                            </Title>
                                        </div>
                                        <div className="text-gray-700 mb-2">
                                            <Text>
                                                {`Input : ${atob(
                                                    testcase.input
                                                )}`}
                                            </Text>
                                            <br />
                                            <Text>
                                                {`Expected Output : ${atob(
                                                    testcase.expected_output
                                                )}`}
                                            </Text>
                                            {testcase.explanation && (
                                                <>
                                                    <br />
                                                    <br />
                                                    <Text>
                                                        {`Explanation : ${testcase.explanation}`}
                                                    </Text>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                </div>
            )}
        </>
    );
};

export default ProblemComponent;
