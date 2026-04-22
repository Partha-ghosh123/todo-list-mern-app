import { Link } from 'react-router-dom';
import '../style/navbar.css';
import { use, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

function Navbar() {
    const [login,setlogin]=useState(localStorage.getItem("login"));
    const navigate=useNavigate();
    const logout=()=>{
        localStorage.removeItem("login");
       setlogin(null);
       
       setTimeout(() => {
        navigate("/login");
       }, 0);
    }

    useEffect(()=>{
        const handleStorageChange=()=>{
            setlogin(localStorage.getItem("login"));
        }
        window.addEventListener("localstorage-change",handleStorageChange);
        return ()=>{
            window.removeEventListener("localstorage-change",handleStorageChange);
        }
    },[])

    return (
        <nav className="navbar">
           <div className='logo'>To Do App</div>
           <ul className='nav-links'>
            {
                login?
                <>
                <li><Link to="/">List</Link></li>
            <li><Link to="/add">Add Task</Link></li>
            <li><Link onClick={logout}>Logout</Link></li>
                </>:null
            }
            
           </ul>
        </nav>
    );
}

export default Navbar;