import React, { useEffect, useState } from "react";
import { Button, Card, Divider, Flex, List, Select, Space } from "antd";
import {
    LikeFilled,
    LikeOutlined,
    TagsFilled,
    TrophyFilled,
    WarningFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";
import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";
import { Filters } from "./Filters";

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

export const ProblemList = () => {
    const [problems, setProblems] = useState([]);
    const [likedProblems, setLikedProblems] = useState([]);

    const [filters, setFilters] = useState({});
    const [filteredProblems, setFilteredProblems] = useState([]);

    let navigate = useNavigate();

    const fetchProblems = async () => {
        const res = await axiosInstance.get(
            "http://localhost:8000/problem/all"
        );

        setProblems(res.data);
    };

    const fetchLikedProblems = async () => {
        const res = await axiosInstance.get("http://localhost:8000/user/likes");
        const likedProblems = {};

        res.data.liked_problems.forEach((problem_id) => {
            likedProblems[problem_id] = 1;
        });

        setLikedProblems(likedProblems);
    };

    useEffect(() => {
        fetchProblems();
        fetchLikedProblems();
    }, []);

    const redirectToProblem = (problem_id) => {
        navigate(`/problem?problem_id=${problem_id}`);
    };

    const handleLike = async (problem_id) => {
        await axiosInstance.post("/problem/like", { problem_id });
        setProblems((prevProblems) => {
            const newProblems = prevProblems.map((problem) => {
                if (problem._id === problem_id) {
                    problem.likes += 1;
                }
                return problem;
            });

            return newProblems;
        });

        setLikedProblems((likedProblems) => {
            return { ...likedProblems, [problem_id]: 1 };
        });
    };

    const handleUnLike = async (problem_id) => {
        console.log(problem_id);
        await axiosInstance.post("/problem/remove-like", { problem_id });

        setProblems((prevProblems) => {
            const newProblems = prevProblems.map((problem) => {
                if (problem._id === problem_id) {
                    problem.likes -= 1;
                }
                return problem;
            });

            return newProblems;
        });

        setLikedProblems((likedProblems) => {
            return { ...likedProblems, [problem_id]: 0 };
        });
    };

    useEffect(() => {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log("filtered problmes", filteredProblems);
    }, [filteredProblems]);

    return (
        <div className="p-10 flex justify-center">
            <div className="max-w-6xl">
                <Title style={{ fontWeight: "300" }}>Featured</Title>
                <Flex gap={"large"}>
                    <Card
                        title="Trim The String!"
                        bordered={false}
                        className="w-full"
                        style={{
                            boxShadow:
                                "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                        }}
                    >
                        <Text>
                            You are given a string s, print the string that
                            remains after we remove the first and the last
                            character
                        </Text>
                    </Card>
                    <Card
                        title="Trim The String!"
                        bordered={false}
                        className="w-full"
                        style={{
                            boxShadow:
                                "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                        }}
                    >
                        <Text>
                            You are given a string s, print the string that
                            remains after we remove the first and the last
                            character
                        </Text>
                    </Card>
                    <Card
                        title="Trim The String!"
                        bordered={false}
                        className="w-full"
                        style={{
                            boxShadow:
                                "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                        }}
                    >
                        <Text>
                            You are given a string s, print the string that
                            remains after we remove the first and the last
                            character
                        </Text>
                    </Card>
                </Flex>

                <Divider solid />

                <Title style={{ fontWeight: "300" }}>Problems</Title>
                <Flex gap={"large"}>
                    <List
                        className="w-full"
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            onChange: (page) => {
                                console.log(page);
                            },
                            pageSize: 10,
                        }}
                        dataSource={
                            Object.keys(filters).length > 0 && filteredProblems
                                ? filteredProblems
                                : problems
                        }
                        renderItem={(item) => (
                            <List.Item
                                className="hover:cursor-pointer"
                                onClick={() => redirectToProblem(item._id)}
                                key={item._id}
                                actions={[
                                    <div
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            likedProblems[item._id] === 1
                                                ? handleUnLike(item._id)
                                                : handleLike(item._id);
                                        }}
                                    >
                                        <IconText
                                            icon={
                                                likedProblems[item._id] === 1
                                                    ? LikeFilled
                                                    : LikeOutlined
                                            }
                                            text={item.likes}
                                            key="list-vertical-like-o"
                                        />
                                    </div>,
                                    <IconText
                                        icon={TrophyFilled}
                                        text={item.difficulty}
                                        key="list-vertical-like-o"
                                    />,
                                    <IconText
                                        icon={WarningFilled}
                                        text={
                                            item.correct_submissions +
                                                item.wrong_submissions >
                                            0
                                                ? `${(
                                                      item.correct_submissions /
                                                      (item.correct_submissions +
                                                          item.wrong_submissions)
                                                  ).toFixed(2)}%`
                                                : "-"
                                        }
                                        key="list-vertical-like-o"
                                    />,
                                    item.tags && (
                                        <IconText
                                            icon={TagsFilled}
                                            text={item.tags}
                                            key="list-vertical-like-o"
                                        />
                                    ),
                                ]}
                            >
                                <List.Item.Meta
                                    title={<a href={item.href}>{item.title}</a>}
                                />
                                {item.desc}
                            </List.Item>
                        )}
                    />
                    <Filters
                        problems={problems}
                        setFilteredProblems={setFilteredProblems}
                        filters={filters}
                        setFilters={setFilters}
                    />
                </Flex>
            </div>
        </div>
    );
};
