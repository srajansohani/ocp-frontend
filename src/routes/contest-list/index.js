import React, { useEffect, useState } from "react";
import { List, message, Space } from "antd";
import { LikeOutlined, TagsFilled, TrophyFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

export const ContestList = () => {
    const [contests, setContests] = useState();
    let navigate = useNavigate();

    const getContests = async () => {
        try {
            const res = await axiosInstance.get(
                "http://localhost:8000/contest/all"
            );
            setContests(res.data);
        } catch (err) {
            message.error(err.message);
        }
    };

    useEffect(() => {
        getContests();
    }, []);

    const redirectToContest = (contest_id) => {
        navigate(`/contest?id=${contest_id}`);
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
                dataSource={contests}
                renderItem={(item) => (
                    <List.Item
                        onClick={() => redirectToContest(item._id)}
                        key={item._id}
                        actions={[
                            <IconText
                                icon={LikeOutlined}
                                text={item.likes}
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
