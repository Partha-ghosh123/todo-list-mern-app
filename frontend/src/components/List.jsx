import { Fragment, useEffect,useState } from "react";
import "../style/list.css";
import { Link } from "react-router-dom";

export default function List(){
    const [taskdata,settaskdata]=useState();
    const [selectedTasks, setSelectedTasks] = useState([]);

    useEffect(()=>{
        getlistdata();
    },[]);
    const getlistdata=async()=>{
        let list=await fetch("http://localhost:3000/tasks",{credentials: "include"});
        list=await list.json();
        if(list.success){
            settaskdata(list.result);
        }else{
        alert("Try after some time");
    }
    }
    const deleteTask=async (id)=>{
        let result=await fetch(`http://localhost:3000/delete-task/${id}`,{method: "DELETE",credentials: "include"});
        result=await result.json();
        if(result.success){
            getlistdata();
        }else{
        alert("Try after some time");
    }
    }
    const selectall=(event)=>{
        if(event.target.checked){
            const allTaskIds = taskdata.map((task) => task._id);
            setSelectedTasks(allTaskIds);
        } else {
            setSelectedTasks([]);
        }
    };
    const selectsingleitem=(id)=>{
        if(selectedTasks.includes(id)){
            setSelectedTasks(selectedTasks.filter((taskId) => taskId !== id)); 
        } else {
            setSelectedTasks([...selectedTasks, id]);
        }
    };
    
const deletemultiple=async()=>{
    let result=await fetch("http://localhost:3000/delete-multiple",{
        method: "DELETE",  
            credentials: "include", 
        body: JSON.stringify(selectedTasks),
        headers: {
            "Content-Type": "application/json"  
        }
    });
    result=await result.json();
    if(result.success){
        getlistdata();
    }else{
        alert("Try after some time");
    }
}
    return(
        <div className="list-container">
            <h1>To Do List</h1>
            
            <ul className="task-list">
                <li className="list-header"><input onChange={selectall} type="checkbox"/></li>
                <li className="list-header">S.No</li>
                <li className="list-header">Title</li>
                <li className="list-header">Description</li>
                <li className="list-header">Action</li>

                {
                    taskdata && taskdata.map((item,index)=>(
                       <Fragment key={item._id}>
                       <li className="list-item"><input onChange={()=>selectsingleitem(item._id)} checked={selectedTasks.includes(item._id)}  type="checkbox"/></li>
                       <li className="list-item">{index + 1}</li>
                       <li className="list-item">{item.title}</li>
                       <li className="list-item">{item.description}</li>
                       <li className="list-item">
                        <button  onClick={() => deleteTask(item._id)} className="delete-item">Delete</button> 
                        <Link  to={`/update-task/${item._id}`} className="update-item">update</Link>
                        </li>
                       </Fragment>
                    ))
                }
            </ul>
            <button onClick={deletemultiple} className="delete-item delete-multiple">Delete</button>
        </div>
    )
}