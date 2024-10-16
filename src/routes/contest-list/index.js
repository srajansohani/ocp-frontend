import React, { useEffect, useState } from "react";
import { List, message, Space } from "antd";
import { LikeOutlined, TagsFilled, TrophyFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";
import { Card, Typography } from 'antd';
import moment from 'moment';
import { Row, Col, Button } from 'antd';
import { ClockCircleOutlined, CalendarOutlined } from '@ant-design/icons';

const ContestCard = ({ title, dateTime }) => {
    const formattedDate = new Date(dateTime);
  return (
    <Card
      className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      hoverable
      cover={
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-4 flex justify-between items-center">
          <img src="https://www.shutterstock.com/image-vector/hackathlon-vector-illustration-flat-tiny-260nw-1569649399.jpg" />
        </div>
      }
    >
      <div className="p-2">
        <h3 className="text-lg font-semibold">
          {title} 
        </h3>
        <Row justify="space-between" align="middle" className="mt-2">
          <Col>
            <span className="text-gray-500">{formattedDate.toDateString()}</span>
          </Col>
          <Col>
            <Button icon={<CalendarOutlined />} />
          </Col>
        </Row>
      </div>
    </Card>
  );
};


const { Title, Text } = Typography;

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

export const ContestList = () => {
    const [contests, setContests] = useState();
    let navigate = useNavigate();
    console.log(Date.now());
    const getContests = async () => {
        try {
            const res = await axiosInstance.get(
                "contest/all"
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
            <div>
                <h2>Upcoming Contests</h2>
                <List
                itemLayout="horizontal"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 10,
                }}
                dataSource={contests?.filter((contest)=> new Date(contest?.start_time) > new Date())}
                renderItem={(item) => (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <ContestCard
                        onClick={() => redirectToContest(item._id)}
                        key={item._id}
                        time={item?.start_time}
                        dateTime={item?.start_time}
                        description={item.description}
                        title={item.title}

                    />  
                </div>
                )}
            />
            </div>
            <div>
                <h2>Past Contests</h2>
                <List
                itemLayout="vertical"
                size="large"
                
                dataSource={contests?.filter((contest)=> new Date(contest?.start_time) < new Date())}
                renderItem={(contest) => (
                    <List.Item className="flex items-center cursor-pointer">
                    <div className="flex w-96">
                        <div className="flex items-center space-x-4">
                            <img
                            className="w-16 h-16 rounded-lg object-cover"
                            src="https://static.wixstatic.com/media/704318ee9be94acabf28919a734951b8.jpg/v1/fill/w_640,h_614,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/704318ee9be94acabf28919a734951b8.jpg"
                            alt={contest.title}
                            />
                            <div>
                            <h3 className="text-lg font-semibold">{contest.title}</h3>
                            <p className="text-sm text-gray-500">{new Date(contest?.start_time).toTimeString()}</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <Button onClick={()=>{redirectToContest(contest._id)}} type="text" className="text-purple-500">
                                view
                            </Button>
                        </div>
                    </div>
                </List.Item>
                )}
            />

            </div>
            
        </div>
    );
};


