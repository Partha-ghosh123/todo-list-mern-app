import { Link } from "react-router-dom";
import "../style/addtask.css";
import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

function Signup() {
  const [userData,setUserData]=useState("");
  const navigate=useNavigate();
useEffect(()=>{
   if(localStorage.getItem("login")){
    navigate("/");
    }
  })

  const handlesignup=async()=>{
    console.log(userData);
    let result=await fetch("http://localhost:3000/signup",{
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
            "Content-Type": "application/json"
        },
    })
    result=await result.json();
    if(result){
        console.log(result);
        document.cookie="token="+result.token;
        localStorage.setItem("login",userData.email);
        navigate("/");
        // console.log("user signed up successfully");
    }else{
      alert("Try after some time");
    }
  }
  return (
    <div className="container">
      <h2>Sign Up</h2>
     
        <label htmlFor="">Username</label>   
        <input onChange={(e)=>setUserData({...userData,name:e.target.value})} type="text"  name="name" placeholder="Enter User name" />

        <label htmlFor="">Email</label>   
        <input onChange={(e)=>setUserData({...userData,email:e.target.value})} type="email"  name="email" placeholder="Enter user Email" />

        <label htmlFor="">Password</label>   
        <input onChange={(e)=>setUserData({...userData,password:e.target.value})} type="password"  name="password" placeholder="Enter user Password" />
        <button  onClick={handlesignup} className="submit">Sign Up</button>
        <Link className="link" to="/login">Login</Link>
    </div>
  );
}
export default Signup;