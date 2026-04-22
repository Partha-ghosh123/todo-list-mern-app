import "../style/addtask.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddTask() {
    const [taskdata, setTaskdata] = useState();
    const navigate=useNavigate();
    const handleaddtask=async (event)=>{
        console.log(taskdata);
        let result=await fetch("http://localhost:3000/add-task",{
            method: "POST",
            body: JSON.stringify(taskdata),
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        });
        result=await result.json();
        if(result.success){
            navigate("/");
            console.log("new task added successfully");
        }else{
            alert("Try after some time");
        }
    }

  return (
    <div className="container">
      <h2>Add New Task</h2>
     
        <label htmlFor="title">Title</label>   
        <input onChange={(event)=>setTaskdata({...taskdata,title:event.target.value})} type="text"  name="title" placeholder="Task Title" />
        <label htmlFor="description">Description</label>
        <textarea onChange={(event)=>setTaskdata({...taskdata,description:event.target.value})} rows={4} name="description" placeholder="EnterTask Description"></textarea>
        <button  onClick={handleaddtask} className="submit">Add New Task</button>
      
    </div>
  );
}
export default AddTask;