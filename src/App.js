import { Routes, Route } from "react-router-dom"
import MainApp from "./routes"
import { useDispatch, useSelector } from "react-redux"
import { increment, incrementByAmount } from "./redux/counter/counterSlice";
import { Navbar } from "./components/Navbar";

function App(){

  //Example for redux (to remove)
  const count = useSelector((store)=> store.counter.value);
  const dispatch = useDispatch();
  console.log(count);
  return <>
    <Navbar />
    <MainApp />
    <button onClick={()=>{dispatch(incrementByAmount(3))}}>
      increment
    </button>
    <h1>{count}</h1>

  </>
}

export default App