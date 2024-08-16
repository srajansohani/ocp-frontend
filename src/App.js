import { Routes, Route, useNavigate } from "react-router-dom";
import MainApp from "./routes";
import { useDispatch, useSelector } from "react-redux";
import { increment, incrementByAmount } from "./redux/counter/counterSlice";
import { useEffect, useState } from "react";
import axiosInstance from "./utils/axiosConfig";
import { Navbar } from "./components/Navbar/index";
function App() {
    //Example for redux (to remove)

    return (
        <>
            <Navbar />
            <main className="pt-16">
                <MainApp />
            </main>
            {/* <button onClick={()=>{dispatch(incrementByAmount(3))}}>
      increment
    </button>
    <h1>{count}</h1> */}
        </>
    );
}

export default App;
