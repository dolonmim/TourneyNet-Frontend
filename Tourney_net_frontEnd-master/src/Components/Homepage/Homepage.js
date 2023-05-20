import './Homepage.css'
import {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import {FaUserCircle} from 'react-icons/fa';
function Homepage(){
    const [user,setUser]=useState();
    const navigate=useNavigate();
    if(!localStorage.getItem('user-info')){
        navigate('/login');
      }

    useEffect(()=>{ 
        async function getUser(){
            let result = await fetch("http://localhost:51753/api/FanPosts",{
                method:'GET',
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                }
            });
            result = await result.json();
            var revresult = result.reverse();
            setUser(revresult);
        }
        getUser();
    },[]);

    async function handlePost(){
        let item={PostContent:document.getElementsByClassName('post-input')[0].value,PostDate:new Date().toLocaleString(),Posted_by_Id:JSON.parse(localStorage.getItem('user-info')).reg_id};
        let result = await fetch("http://localhost:51753/api/FanPosts/create",{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(item)
        });
        result = await result.json();
        if(result){
            window.location.reload();
        }
    }

    return(
        <>
        <div class='content-wrapper'>
            <div class='input-status'>
                <textarea placeholder='What is on your mind?' class='post-input'></textarea>
            </div>
            <div class='post-button'>
                <button onClick={handlePost} class='btn btn-primary'>Post</button>
            </div>
            <div class='post-container'>
            <div className='row'>
            {user?user.map((item)=>
            <div class='col-md-12' key={item.id}>
                        <div class='card post-card'>
                            <div class='card-header name-header'>
                                 <h1><FaUserCircle/></h1>
                                <h3>{item.Registration.UserName}</h3>
                            </div>
                            <div class='card-body'>
                                <h5>{item.PostContent}</h5>
                                <div class='post-time'>
                                <h6>{item.PostDate}</h6>
                                </div>
                            </div>
                        </div>
            </div>):null} 
            </div>
            </div>   
        </div>   
    </> 
    )
}
export default Homepage;