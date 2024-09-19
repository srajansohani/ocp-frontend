import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";
import { Checkbox, Flex, List, Space, Typography } from "antd";
import Title from "antd/es/typography/Title";
import { LeaderBoard } from "./LeaderBoard";
import { LikeOutlined, TrophyFilled } from "@ant-design/icons";
import { Table, Tag } from "antd";
import "antd/dist/reset.css";

const { Text } = Typography;

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

export const Contest = () => {
    const [contest, setContest] = useState();
    const [searchParams, setSearchParams] = useSearchParams();
    const [problems, setProblems] = useState([]);
    const navigate = useNavigate();

    const fetchContest = async (contest_id) => {
        const res = await axiosInstance.get(
            `/contest?contest_id=${contest_id}`
        );
        setContest(res.data);
        setProblems([
            ...res.data.problems.map((p) => ({
                ...p.problem,
                score: p.score,
                isSolved: false,
            })),
        ]);
    };

    useEffect(() => {
        fetchContest(searchParams.get("id"));
    }, [searchParams]);

    const redirectToProblem = (problem_id) => {
        navigate(`/problem?problem_id=${problem_id}&contest_id=${contest._id}`);
    };

    return (
        <div className="p-10">
            {contest && (
                <>
                    <div>
                        <Title>{contest.title}</Title>
                        <Text>{contest.description}</Text>
                    </div>
                    <Flex gap="large">
                        <ProblemListTable
                            problems={problems}
                            redirectToProblem={redirectToProblem}
                        />
                        <LeaderBoard
                            contest_id={contest._id}
                            problems={contest.problems}
                        />
                    </Flex>
                </>
            )}
        </div>
    );
};

function ProblemListTable({ problems, redirectToProblem }) {
    // Define columns for the table
    const columns = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            render: (text, record) => (
                <Space size="middle">
                    <p
                        className=" cursor-pointer"
                        onClick={() => {
                            redirectToProblem(record._id);
                        }}
                    >
                        {text}
                    </p>
                </Space>
            ),
        },
        {
            title: "Score",
            dataIndex: "score",
            key: "score",
        },
        {
            title: "Difficulty",
            dataIndex: "difficulty",
            key: "difficulty",
            render: (difficulty) => (
                <Tag
                    color={
                        difficulty === "Easy"
                            ? "green"
                            : difficulty === "Medium"
                            ? "orange"
                            : "red"
                    }
                >
                    {difficulty}
                </Tag>
            ),
        },
        {
            title: "Solved",
            key: "isSolved",
            render: (_, record) => (
                <Checkbox checked={record.isSolved} disabled />
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={problems}
            rowKey="_id"
            getContainerWidth={100}
            pagination={false}
            size="small"
            className="w-9/12 ml-20 border-s-black"
        />
    );
}

export default ProblemListTable;
