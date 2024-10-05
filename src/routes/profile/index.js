import { Button, Divider, Flex, List, Segmented, Space, Table } from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import Text from "antd/es/typography/Text";
import { Tag } from "./Tag";
import AccuracyChart from "./AccuracyChart";
import ProblemDistributionChart from "./ProblemDistributionChart";

function Profile() {
    const [userData, setUserData] = useState({});
    const [metrics, setMetrics] = useState();
    const [segment, setSegment] = useState("");
    let navigate = useNavigate();

    const getUserData = async () => {
        const res = await axiosInstance.get(
            "user/profile?user_id=66bcf04ac3cbf0e5278ce078"
        );
        console.log("data : ", res.data);
        setUserData(res.data.user);
        setMetrics(res.data.metrics);
    };

    useEffect(() => {
        getUserData();
    }, []);

    const columns = [
        {
            title: "Problems Solved",
            dataIndex: "title",
            key: "problem_title",
        },
    ];

    return (
        <>
            {metrics && (
                <Flex
                    className="p-8 bg-slate-50"
                    style={{
                        height: "calc(100vh - 64px)",
                    }}
                    gap="middle"
                    justify="center"
                >
                    <div>
                        <Flex
                            vertical
                            className="bg-white rounded-md shadow-lg border-gray-200 min-w-[300px] p-8"
                        >
                            <div>
                                <Flex gap="middle" className="mb-5">
                                    <img
                                        src="https://assets.leetcode.com/users/default_avatar.jpg   "
                                        alt="profile icon"
                                        className="h-20 w-20 rounded-md"
                                    />
                                    <Flex vertical justify="space-between">
                                        <div>
                                            <Title
                                                level={5}
                                                style={{ marginBottom: -8 }}
                                            >
                                                {userData.name}
                                            </Title>
                                            <Text>{userData.username}</Text>
                                        </div>
                                        <Text>{userData.email}</Text>
                                    </Flex>
                                </Flex>
                                <Paragraph>{userData.description}</Paragraph>
                                <Button
                                    style={{ width: "100%" }}
                                    disabled={true}
                                >
                                    Edit profile
                                </Button>
                            </div>
                            <Divider />

                            <div>
                                <Title
                                    level={5}
                                    style={{ fontWeight: "normal" }}
                                >
                                    Languages
                                </Title>
                                <Flex vertical gap="middle">
                                    {metrics &&
                                        Object.keys(metrics.language_count).map(
                                            (key) => {
                                                return (
                                                    <Flex justify="space-between">
                                                        <Tag text={key} />
                                                        <div className="self-end">
                                                            <Text
                                                                style={{
                                                                    margin: 0,
                                                                }}
                                                            >
                                                                <Text strong>
                                                                    {
                                                                        metrics
                                                                            .language_count[
                                                                            key
                                                                        ]
                                                                    }
                                                                </Text>{" "}
                                                                submissions
                                                            </Text>
                                                        </div>
                                                    </Flex>
                                                );
                                            }
                                        )}
                                </Flex>
                            </div>
                            <Divider />

                            <div className="w-[300px]">
                                <Title
                                    level={5}
                                    style={{ fontWeight: "normal" }}
                                >
                                    Skills
                                </Title>
                                {metrics &&
                                    Object.keys(metrics.tag_count).map(
                                        (key) => {
                                            return (
                                                <Space className="mr-5 my-1">
                                                    <Tag text={key} />
                                                    <div className="self-center">
                                                        <Text
                                                            style={{
                                                                margin: 0,
                                                            }}
                                                        >
                                                            x
                                                            {
                                                                metrics
                                                                    .tag_count[
                                                                    key
                                                                ]
                                                            }
                                                        </Text>
                                                    </div>
                                                </Space>
                                            );
                                        }
                                    )}{" "}
                            </div>
                        </Flex>
                    </div>
                    <Flex gap="middle" className="w-[850px]" vertical>
                        <Flex gap="middle">
                            <ProblemDistributionChart
                                problemCount={metrics.problem_count}
                            />
                            <AccuracyChart
                                problemCount={metrics.accuracy_count}
                            />
                        </Flex>

                        <div className="bg-white rounded-md shadow-lg border-gray-200 p-4">
                            <Segmented
                                options={[
                                    {
                                        label: (
                                            <div className="p-4">Recent Ac</div>
                                        ),
                                        value: "problems",
                                    },
                                    {
                                        label: (
                                            <div className="p-4">
                                                Liked Problems
                                            </div>
                                        ),
                                        value: "likes",
                                    },
                                ]}
                                onChange={(value) => {
                                    setSegment(value);
                                }}
                            />
                            {/* 
                            <Table
                                dataSource={userData.solved_problems}
                                columns={columns}
                                className="cursor-pointer"
                                onRow={(record, rowIndex) => {
                                    return {
                                        onClick: (event) => {
                                            navigate(
                                                `/problem?problem_id=${record._id}`
                                            );
                                        },
                                    };
                                }}
                            /> */}

                            <List
                                dataSource={
                                    segment === "problems"
                                        ? userData.solved_problems
                                        : userData.likes
                                }
                                renderItem={(item, index) => (
                                    <List.Item
                                        style={{ padding: "1.5rem 1rem" }}
                                        className={
                                            index % 2
                                                ? "bg-[#F5F5F5] rounded-lg"
                                                : ""
                                        }
                                        onClick={() => {
                                            navigate(
                                                `/problem?problem_id=${item._id}`
                                            );
                                        }}
                                    >
                                        <Text>{item.title}</Text>
                                    </List.Item>
                                )}
                            />
                        </div>
                    </Flex>
                </Flex>
            )}
        </>
    );
}

export default Profile;
