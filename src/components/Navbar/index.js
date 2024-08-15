import React from "react";
import { Menu, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
import { store } from "../../redux/store";
import { useSelector } from "react-redux";
export const Navbar = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((store) => store.user.isAuthenticated);
    const userMenu = (
        <Menu>
            <Menu.Item onClick={() => { navigate('/profile') }} key="0">Profile</Menu.Item>
            <Menu.Divider />
            {
                (isAuthenticated) ? <Menu.Item onClick={() => {
                    window.localStorage.removeItem('token');
                    window.location.reload();
                }} key="2">Logout</Menu.Item>
                    :
                    <Menu.Item onClick={() => {
                        navigate('/auth/login')
                    }} key="2">Login</Menu.Item>
            }
        </Menu>
    );
    return <>
        <header className="bg-gray-800 text-white shadow-lg fixed w-full z-10">
            <div className="container mx-auto px-4 flex justify-between items-center h-16">
                <div className="text-xl font-bold">OCP</div>
                <nav className="space-x-8">
                    <Link to={"/problems"} className="hover:text-gray-300">

                        Problems
                    </Link>
                    <Link to={"/contests"} className="hover:text-gray-300">
                        Contests
                    </Link>
                    <Link to={"/playground"} className="hover:text-gray-300">
                        Playground
                    </Link>
                </nav>
                <Dropdown overlay={userMenu} trigger={['click']}>
                    <div className="cursor-pointer flex items-center">
                        <UserOutlined className="text-xl" />
                    </div>
                </Dropdown>
            </div>
        </header>

    </>
};
