import "../style/addtask.css";
import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function Updatetask() {
    const [taskdata, setTaskdata] = useState();
    const navigate=useNavigate();
    const {id}=useParams();
    useEffect(()=>{
        getTaskdata(id);
    },[]);
     
    const getTaskdata=async (id)=>{
        let result=await fetch(`http://localhost:3000/task/${id}`);
        result=await result.json();
        if(result.success){
            setTaskdata(result.result);
        }

    }
    const updatetask= async (event)=>{
        console.log("testing",taskdata);
        let task=await fetch("http://localhost:3000/update-task",{
            method: "PUT",
            body: JSON.stringify(taskdata),
            headers: {
                "Content-Type": "application/json"
            }
        });
        task=await task.json();
        if(task.success){
            navigate("/");
        }
    };
  return (
    <div className="container">
      <h2>Update Task</h2>
     
        <label htmlFor="title">Title</label>   
        <input value={taskdata?.title} onChange={(event)=>setTaskdata({...taskdata,title:event.target.value})} type="text"  name="title" placeholder="Task Title" />
        <label htmlFor="description">Description</label>
        <textarea value={taskdata?.description} onChange={(event)=>setTaskdata({...taskdata,description:event.target.value})} rows={4} name="description" placeholder="EnterTask Description"></textarea>
        <button onClick={updatetask}  className="submit">Update Task</button>
      
    </div>
  );
}
export default Updatetask;