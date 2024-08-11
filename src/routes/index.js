import { Routes, Route } from "react-router-dom"

//Add all routes here
function MainApp() {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="about" element={ <About/> } />
          <Route path="contact" element={ <Contact/> } />
        </Routes>
      </div>
    )
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