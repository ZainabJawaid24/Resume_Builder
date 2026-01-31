import { useState } from "react";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

function Signup(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
        .then((e) => {
            alert("Signup Successfully!")
             navigate("/resume-builder");
    })
        .catch((error) => {
            alert(error.message)
    })
    }
    return(
        <>
        <form onSubmit={handleSignup}>
            <h2>Signup</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <br />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <br />
            <button type="submit">Signup</button>
            <br />
            <p>Already Have an account <Link to ="/Login">Login</Link></p>
        </form>
        </>
    )
}
export default Signup;