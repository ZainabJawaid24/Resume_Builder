import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import ResumeBuilder from "./components/ResumeBuilder";
import ViewResume from "./components/ViewResume"; 
import EditResume from "./components/EditResume";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

function App(){
  return(
    <>
    <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<Login />}/>
      <Route path = "/signup" element = {<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/resume-builder" element={<ResumeBuilder />} />
      <Route path="/view/:id" element={<ViewResume />} />
      <Route path="/edit/:id" element={<EditResume />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}
export default App;