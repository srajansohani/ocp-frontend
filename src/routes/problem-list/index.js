import React, { useEffect, useState } from "react";
import { List, message, Space } from "antd";
import {
    LikeFilled,
    LikeOutlined,
    TagsFilled,
    TrophyFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

export const ProblemList = () => {
    const [problems, setProblems] = useState([]);
    const [likedProblems, setLikedProblems] = useState([]);
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

    return (
        <div className="p-10">
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 10,
                }}
                dataSource={problems}
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
                            item.tags && (
                                <IconText
                                    icon={TagsFilled}
                                    text={item.tags}
                                    key="list-vertical-like-o"
                                />
                            ),
                        ]}
                        extra={
                            <img
                                width={170}
                                alt="logo"
                                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                            />
                        }
                    >
                        <List.Item.Meta
                            title={<a href={item.href}>{item.title}</a>}
                        />
                        {item.desc}
                    </List.Item>
                )}
            />
        </div>
    );
};
