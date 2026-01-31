import { useState } from "react";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
        .then((e) => {
            alert("Login Successfully!");
            navigate("/resume-builder");
    })
        .catch((error) => {
            alert(error.message)
    });
    }
    return(
        <>
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <br />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <br />
            <button type="submit">Login</button>
            <br />
            <p>Don't Have an account <Link to ="/Signup">Signup</Link></p>
        </form>
        </>
    )
}
export default Login;