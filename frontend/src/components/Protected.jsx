import { Navigate } from "react-router-dom";

export default function Protected({children}){
    if(!localStorage.getItem("login")){
        return <Navigate to="/login" replace />
    }
    return children;
    // }else{
    //     return <h1>404 Not Found</h1>
    // }
}