import { Routes, Route, useNavigate } from "react-router-dom";
import MainApp from "./routes";
import { useDispatch, useSelector } from "react-redux";
import { increment, incrementByAmount } from "./redux/counter/counterSlice";
import { Navbar } from "./components/Navbar";
import { useEffect,useState } from "react";
import axiosInstance from "./utils/axiosConfig";
function App() {
    //Example for redux (to remove)
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    useEffect(()=>{
        if(window.localStorage.token){
            setIsAuthenticated(true);
        }
    },[])


    return (
        <>
            <Navbar />
            <MainApp isAuthenticated={isAuthenticated} />
            {/* <button onClick={()=>{dispatch(incrementByAmount(3))}}>
      increment
    </button>
    <h1>{count}</h1> */}
        </>
    );
}

export default App;
