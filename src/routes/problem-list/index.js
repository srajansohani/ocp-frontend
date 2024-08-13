import React, { useEffect, useState } from "react";
import { List, Space } from "antd";
import axios from "axios";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

export const ProblemList = () => {
    const [problems, setProblems] = useState();
    let navigate = useNavigate();

    const fetchProblems = async () => {
        const res = await axios.get("http://localhost:8000/problem/all");
        setProblems(res.data);
    };

    useEffect(() => {
        fetchProblems();
    }, []);

    const redirectToProblem = (problem_id) => {
        // console.log(problem_id);
        navigate(`/problem?problem_id=${problem_id}`);
    };

    return (
        <>
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
                        onClick={() => redirectToProblem(item._id)}
                        key={item.title}
                        actions={[
                            <IconText
                                icon={StarOutlined}
                                text="156"
                                key="list-vertical-star-o"
                            />,
                            <IconText
                                icon={LikeOutlined}
                                text="156"
                                key="list-vertical-like-o"
                            />,
                            <IconText
                                icon={MessageOutlined}
                                text="2"
                                key="list-vertical-message"
                            />,
                        ]}
                        extra={
                            <img
                                width={272}
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
        </>
    );
};
