// src/components/Login.js

import React, { useEffect } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import axios from 'axios';
import axiosInstance from '../../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUserId, authenticate } from '../../redux/userSlice';
import { Link } from 'react-router-dom';

const { Title,Text } = Typography;

const Login = ({isAuthenticated}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        if(isAuthenticated){navigate('/')}
    },[isAuthenticated])
  const onFinish = async (values) => {
    try {
      const response = await axiosInstance.post('/user/login', values);
      const { token } = response.data;
      localStorage.setItem('token', token);
      dispatch(addUserId(response.data.user_id));
      dispatch(authenticate());
      navigate('/problems');
      message.success('Login successful!');
    } catch (error) {
      message.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <Title level={2} className="text-center mb-6">
          Log In
        </Title>
        <Form name="login" layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
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
              Log In
            </Button>
          </Form.Item>
        </Form>
        <div className="mt-4 text-center">
          <Text className="text-sm">
            Don’t have an account?{' '}
            <Link to="/auth/signup" className="text-blue-500 hover:underline">
              Create account
            </Link>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Login;
