// src/components/Signup.js

import React from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { Link } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import axiosInstance from '../../utils/axiosConfig';
import { useDispatch } from 'react-redux';
import { addUserId } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;


const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axiosInstance.post('/user/register', values);
      console.log(response.data);
      dispatch(addUserId(response.data.user_id))
      window.localStorage.setItem('token',response.data.token);
      message.success('Signup successful!');
      navigate('/');
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <Title level={2} className="text-center mb-6">
          Sign Up
        </Title>
        <Form name="signup" layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your Name' }]}
            >
                <Input />
            </Form.Item>

          <Form.Item 
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            >
                <TextArea />
            </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <div className="mt-4 text-center">
          <Text className="text-sm">
            Already have an account?{' '}
            <Link to="/auth/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Signup;
