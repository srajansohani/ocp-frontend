import React, { useEffect, useState } from "react";
import { List, Space } from "antd";
import axios from "axios";
import {
    LikeOutlined,
    MessageOutlined,
    StarOutlined,
    TagsFilled,
    TrophyFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

export const ProblemList = () => {
    const [problems, setProblems] = useState();
    const [isResult, setIsResult] = useState();
    let navigate = useNavigate();

    const fetchProblems = async () => {
        const res = await axios.get("http://localhost:8000/problem/all");
        setProblems(res.data);
    };

    useEffect(() => {
        fetchProblems();
    }, []);

    const redirectToProblem = (problem_id) => {
        navigate(`/problem?problem_id=${problem_id}`);
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
                        onClick={() => redirectToProblem(item._id)}
                        key={item._id}
                        actions={[
                            <IconText
                                icon={LikeOutlined}
                                text={item.likes}
                                key="list-vertical-like-o"
                            />,
                            <IconText
                                icon={TrophyFilled}
                                text={item.difficulty}
                                key="list-vertical-like-o"
                            />,
                            <IconText
                                icon={TagsFilled}
                                text={item.tags}
                                key="list-vertical-like-o"
                            />,
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
