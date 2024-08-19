import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";
import { Flex, List, Space, Typography } from "antd";
import Title from "antd/es/typography/Title";
import { LeaderBoard } from "./LeaderBoard";
import { LikeOutlined, TrophyFilled } from "@ant-design/icons";

const { Text } = Typography;

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

export const Problem = () => {
    const [contest, setContest] = useState();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const fetchContest = async (contest_id) => {
        // const res = await axiosInstance.get(
        //     `/contest?problem_id=${contest_id}`
        // );
        // setContest(res.data);
    };

    useEffect(() => {
        fetchContest(searchParams.get("contest_id"));
    }, [searchParams]);

    const redirectToProblem = (problem_id) => {
        navigate(
            `/problem?problem_id=${problem_id}&contest_id=${contest.contest_id}`
        );
    };

    return (
        <>
            {contest && (
                <Flex className="p-10">
                    <div>
                        <Title>{contest.title}</Title>
                        <Text>{contest.description}</Text>

                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                onChange: (page) => {
                                    console.log(page);
                                },
                                pageSize: 10,
                            }}
                            dataSource={contest.problems}
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
                                    ]}
                                    extra={
                                        <img
                                            width={170}
                                            alt="logo"
                                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                        />
                                    }
                                >
                                    <List.Item.Meta title={item.title} />
                                    {item.desc}
                                </List.Item>
                            )}
                        />
                    </div>
                    <LeaderBoard contestId={contest.contest_id} />
                </Flex>
            )}
        </>
    );
};
