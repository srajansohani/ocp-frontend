import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { Playground } from "./playground";
import { ProblemList } from "./problem-list";
import { Problem } from "./problem";
import Profile from "../profile";
import SignUp from "./auth/SignUp";
import Login from "./auth/Login";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../redux/store";
import axiosInstance from "../utils/axiosConfig";
import { message, Spin } from "antd";
import { addUserId, authenticate } from "../redux/userSlice";

//Add all routes here
function MainApp() {
    const [loader, setLoader] = useState(true);
    const isAuthenticated = useSelector((store) => store.user.isAuthenticated);
    const dispatch = useDispatch();
    const verifyUser = async () => {
        try {
            setLoader(true);
            const res = await axiosInstance.get('/user');
            dispatch(authenticate());
            dispatch(addUserId(res.data.user_id));
            setLoader(false);
            console.log(res.data);
        }
        catch (error) {
            message.error(error.message);
            setLoader(false);
        }
    }
    useEffect(() => {
        if (window.localStorage.token) {
            verifyUser();
        }
        else{
            setLoader(false);
        }
    }, [])
    return (
        <div className="App">
            {(loader) ? <Spin /> : <Routes>
                <Route element={(
                    isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" />
                )}>
                    <Route path="/" element={<Home />} />
                    <Route path="/problem" element={<Problem />} />
                    <Route path="/problems" element={<ProblemList />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/playground" element={<Playground />} />
                <Route path="/auth/signup" element={<SignUp />} />
                <Route path="/auth/login" element={<Login isAuthenticated={isAuthenticated} />} />
            </Routes>

            }
        </div>
    );
}

function Home() {
    const userId = useSelector((store) => {
        console.log(store);
    })
    useEffect(() => {

    }, [])
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function Contact() {
    return <h2>Users</h2>;
}

export default MainApp;
