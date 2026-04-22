import "../style/addtask.css";
import React,{ useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Login() {
  const [userData,setUserData]=useState("");
  const navigate=useNavigate();


  useEffect(()=>{
   if(localStorage.getItem("login")){
    navigate("/");
    }
  })
  const handleLogin=async()=>{
    console.log(userData);
    let result=await fetch("http://localhost:3000/login",{
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
            "Content-Type": "application/json"
        },
    })
    result=await result.json();
    if(result.success){
        // console.log(result);
        document.cookie="token="+result.token;
        localStorage.setItem("login",userData.email);
        window.dispatchEvent(new Event("localstorage-change"));
        navigate("/");
    }else{
      alert("Sign up yourself to login");
    }
  }

  return (
    <div className="container">
      <h2>Login</h2>

        <label htmlFor="">Email</label>   
        <input onChange={(e)=>setUserData({...userData,email:e.target.value})} type="email"  name="email" placeholder="Enter user Email" />

        <label htmlFor="">Password</label>   
        <input onChange={(e)=>setUserData({...userData,password:e.target.value})} type="password"  name="password" placeholder="Enter user Password" />
        
        <button  onClick={handleLogin} className="submit">Login</button>
        <Link className="link" to="/signup">Sign Up</Link>
    </div>
  );
}
export default Login;