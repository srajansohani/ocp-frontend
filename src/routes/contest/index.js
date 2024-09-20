import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";
import { Checkbox, Flex, List, Space, Typography } from "antd";
import Title from "antd/es/typography/Title";
import { LeaderBoard } from "./LeaderBoard";
import { LikeOutlined, TrophyFilled } from "@ant-design/icons";
import { Table, Tag } from 'antd';
import 'antd/dist/reset.css'; 

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
    const [problems,setProblems] = useState([]);
    const [isUpcoming,setIsUpcoming] = useState(false);
    const navigate = useNavigate();

    const fetchContest = async (contest_id) => {
        const res = await axiosInstance.get(
            `/contest?contest_id=${contest_id}`
        );
        setContest(res.data);
        setProblems([...res.data.problems.map((p)=>({...p.problem,score: p.score, isSolved: false}))]);
    };

    useEffect(() => {
        fetchContest(searchParams.get("id"));
    }, [searchParams]);

    useEffect(()=>{
       
        const startTime = new Date(contest?.start_time);
        if(startTime > new Date()){
            setIsUpcoming(true);
        }
        else{
            setIsUpcoming(false);
        }
    },[contest])

    const redirectToProblem = (problem_id) => {
        const startTime = new Date(contest?.start_time);
        const endTime = new Date(startTime.getTime() + contest.duration* 60 * 1000); 
        if(new Date() > startTime && new Date() < endTime){
            navigate(
                `/problem?problem_id=${problem_id}&contest_id=${contest._id}`
            );
        }
        else{
            navigate(`/problem?problem_id=${problem_id}`)
        }
        
    };

    return (
        <>
            {contest && (
                <>
                    <div>
                        <Title>{contest.title}</Title>
                        <Text>{contest.description}</Text>
                    </div>
                    <ProblemListTable  isUpcoming= {isUpcoming} problems={problems}  redirectToProblem={redirectToProblem} />
                    <LeaderBoard isUpcoming={isUpcoming} contestId={contest.contest_id} />
                </>
            )}
        </>
    );
};


function ProblemListTable({ problems,redirectToProblem, isUpcoming}){
    
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text,record)=><Space size="middle">
            <p className=" cursor-pointer" onClick = {()=>{redirectToProblem(record._id)}}>{text}</p>
        </Space>
        },
        {
            title: 'Score',
            dataIndex: 'score',
            key: 'score',
        },
        {
            title: 'Difficulty',
            dataIndex: 'difficulty',
            key: 'difficulty',
            render: difficulty => (
                <Tag color={difficulty === 'Easy' ? 'green' : difficulty === 'Medium' ? 'orange' : 'red'}>
                    {difficulty}
                </Tag>
            ),
        },
        {
            title: 'Solved',
            key: 'isSolved',
            render: (_, record) => (
                <Checkbox checked={record.isSolved} disabled />
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={isUpcoming ? [] : problems}
            rowKey="_id"
            getContainerWidth={100}
            pagination={false}
            size="small"
            className="w-9/12 ml-20 border-s-black"
            locale={{
                emptyText: 'Problems will display once contest is started!!',
              }}
        />
    );
};

export default ProblemListTable;

