import { Button, Segmented, Table } from 'antd'
import Title from 'antd/es/skeleton/Title'
import React,{useState,useEffect} from 'react'
import { PieChart } from 'react-minimal-pie-chart';
import UserProblemDistribution from '../components/UserProblemDistribution';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosConfig';

function Profile() {
    const [userData,setUserData] = useState({});
    const [problemCount,setProblemCount] = useState({
        Easy: 0,
        Medium: 0,
        Hard: 0
    });
    const [segment,setSegment] = useState('')
    let navigate = useNavigate();
    const getUserData =async()=>{
        const res = await axiosInstance.get('user/profile?user_id=66bcf04ac3cbf0e5278ce078');
        setUserData(res.data.user);
        setProblemCount(res.data.metrics.problem_count);
    }
    useEffect(()=>{
        getUserData();
    },[])
    const columns = [
        {
            title: 'Problems Solved',
            dataIndex: 'title',
            key: 'problem_title',
        }
    ]
  return (
    <div className='flex '>
        <div className='basis-1/2'>
            <div className='rounded-md shadow-lg border-gray-200 w-1/2 h-40 mb-20'>
                <div className='flex'>
                    <img src='https://assets.leetcode.com/users/default_avatar.jpg' className='h-12 w-14 rounded-md'/>
                    <div>
                        <h1 className='ml-4'>Name : {userData.name}</h1>
                        <p className='ml-4'>email: {userData.email}</p>
                    </div>
                </div>
                <div>
                    {userData.description}
                </div>
                <Button className='mt-5 w-max' disabled={true}>Edit profile</Button>
            </div>

            <div className='rounded-md shadow-lg border-gray-200 w-1/2 h-80'>
                <h1 className='font-bold mb-4'>Languages</h1>
                <div className='grid-flow-col'>
                    <div className='mb-2'>
                        c++
                    </div>
                    <div className='mb-2'>
                        java
                    </div>
                    <div className='mb-2'>
                        javascript
                    </div>
                </div>
            </div>
            <div  className='rounded-md shadow-lg border-gray-200 w-1/2 h-80 mt-10'>
                <h1 className='font-bold mb-4'>Skills</h1>
            </div>

        </div>
        <div>
                <div className='rounded-md shadow-lg '>
                    <UserProblemDistribution problemCount={problemCount}/>
                    <div>
                    </div>
                </div>
                
                <div className='rounded-md shadow-lg border-gray-200 h-80 mt-10 '>
                    <Segmented
                        options={[{
                            label: <>Recent Ac</>,
                            value: 'problems'
                        } , 
                        {
                            label: <>Submission</>,
                            value: 'submissions'
                        }]}
                        onChange={(value)=>{
                            setSegment(value)
                        }}
    
                    />
                    {
                   <Table dataSource={userData.solved_problems} columns={columns} className='cursor-pointer' onRow={
                    (record,rowIndex)=>{
                        return {
                            
                            onClick: (event)=>{
                                navigate(`/problem?problem_id=${record._id}`)
                            }
                        }
                   }} />}
                </div>
        </div>

    </div>
  )
}

export default Profile