import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Logout(){
    const [result,setResult] =useState();
    const navigate=useNavigate();
    if(result){
        navigate('/login');
        localStorage.removeItem('user-info');
    }
    useEffect(()=>{
        fetch("http://localhost:51753/api/logout",{
            method:'GET',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        })
        .then(response=>response.json())
        .then(data=>setResult(data))
       // .catch(err=>console.log(err))
    });
    return(
        <>
        </>
    );
}
export default Logout;