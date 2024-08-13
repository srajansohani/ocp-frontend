import { Routes, Route } from "react-router-dom";
import { Playground } from "./playground";
import { ProblemList } from "./problem-list";
import { Problem } from "./problem";

//Add all routes here
function MainApp() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/playground" element={<Playground />} />
                <Route path="/problem" element={<Problem />} />
                <Route path="/problems" element={<ProblemList />} />
            </Routes>
        </div>
    );
}

function Home() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function Contact() {
    return <h2>Users</h2>;
}

export default MainApp;
