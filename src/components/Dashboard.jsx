import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import ResumeList from "./ResumeList";
import DarkModeToggle from "./DarkMode";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth).then(() => navigate("/"));
  };

  return (
    <div>
      <DarkModeToggle />

      <h1>Dashboard</h1>

      <button onClick={() => navigate("/resume-builder")}>
        Create Resume
      </button>

      <button onClick={handleLogout}>
        Logout
      </button>

      <hr />

      {/* 👇 NEW FEATURE */}
      <ResumeList />
    </div>
  );
}

export default Dashboard;
