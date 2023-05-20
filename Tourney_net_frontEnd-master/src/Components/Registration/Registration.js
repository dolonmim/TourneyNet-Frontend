import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
function Registration(){

    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [firstname,setFirstname]=useState("");
    const [lastname,setLastname]=useState("");
    const [email,setEmail]=useState("");
    const [type,setType]=useState("Player");
    const navigate = useNavigate();

    async function handlereg(){
        let item={firstname,lastname,username,email,password,type};
        let result = await fetch("http://localhost:51753/api/reg/create",{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(item)
        });
        result = await result.json();
        if(result.Id!=null){
            navigate('/login');
        }  
    }


    return(
        <>
        <Navbar/>
        <div className="container">
            <div className="login-div">
                <h3>Registration</h3>
                <br/>
                <input value={firstname} onChange={(e)=>setFirstname(e.target.value)} type="text" placeholder="Firstname" className="form-control"></input>
                <br/>
                <input value={lastname} onChange={(e)=>setLastname(e.target.value)} type="text" placeholder="Lastname" className="form-control"></input>
                <br/>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder="Email" className="form-control"></input>
                <br/>
                <input value={username} onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="Username" className="form-control"></input>
                <br/>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" className="form-control"></input>
                <br/>
                <select value={type} className='form-control' onChange={(e)=>setType(e.target.value)}>
                    <option value="Player">Player</option>
                    <option value="Organizer">Organizer</option>
                    <option value="Fan">Fan</option>
                </select>
                <br/>
                <button onClick={handlereg} className='btn btn-primary'>Registration</button>
            </div>
        </div>
        </>   
    );
}
export default Registration;