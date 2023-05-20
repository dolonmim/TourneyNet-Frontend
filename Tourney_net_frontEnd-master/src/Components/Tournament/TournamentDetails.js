import {useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import NavbarFan from "../Navbar/NavbarFan";
import NavbarOrg from "../Navbar/NavbarOrg";
import NavbarPlayer from "../Navbar/NavbarPlayer";
import { useState,useEffect } from "react";
import './Tournament.css';
function TournamentDetails() {
  
    const userType = localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info')).Type : null;
    const userId = localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info')).reg_id : null;
    const navigate=useNavigate();
    const [result,setResult] =useState();   
    const [rankings,setRankings] =useState();
    const [Participants,setParticipants] =useState();
    const [matches,setMatches] =useState();
    const [orgId,setOrgId] =useState();
  const { id } = useParams();
  const tournamentId = id;
  if(!localStorage.getItem('user-info')){
    navigate('/login');
  }
  
  useEffect(()=>{ 
    const url = "http://localhost:51753/api/tournaments/"+id;
    async function getResult(){
        let result = await fetch(url,{
            method:'GET',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        });
        result = await result.json();
        setResult(result);
        setRankings(result.Rankings.sort((a, b) => b.Total_point - a.Total_point));
        setParticipants(result.Participants);
        setMatches(result.Matches);
        setOrgId(result.Organizer_Id);
    }
    getResult();
},[id]);

async function generateMatches(Participants, tournamentId) {
  const randommatches = [];
  for (let i = 0; i < Participants.length; i++) {
    for (let j = i + 1; j < Participants.length; j++) {
      const randommatch = {
        Match_number: randommatches.length + 1,
        Match_start_time: new Date().toISOString(),
        Match_end_time: new Date().toISOString(),
        w_score: 0,
        l_score: 0,
        Tournament_id: tournamentId,
        Participant_participant_id:1,
        Match_winner_Name: '---',
        Match_loser_Name: '---',
        participant_name_1: Participants[i].team_name,
        participant_name_2: Participants[j].team_name,
       
      };
      randommatches.push(randommatch);
      let result = await fetch("http://localhost:51753/api/matches/create",{
          method:'POST',
          headers:{
              "Content-Type":"application/json",
              "Accept":"application/json"
          },
          body:JSON.stringify(randommatch)
      });
      result = await result.json();
    }
  }
  window.location.reload();
  return randommatches;
}

async function generatePointTable(Participants) {
  const pointTable = [];

  // Initialize point table with participants' IDs and names
  for (let i = 0; i < Participants.length; i++) {
    const participant = {
      participant_id: Participants[i].participant_id,
      tournament_id: tournamentId,
      Matches_Played: 0,
      Matches_Won: 0,
      Matches_Lost: 0,
      Total_Point: 0,
      team_name: Participants[i].team_name,
    };
    pointTable.push(participant);
    let result = await fetch("http://localhost:51753/api/rankings/create",{
          method:'POST',
          headers:{
              "Content-Type":"application/json",
              "Accept":"application/json"
          },
          body:JSON.stringify(participant)
      });
      result = await result.json();
  }
  window.location.reload();
  return pointTable;
}

function genMatch(){
   generateMatches(Participants, tournamentId);
}
function getTable(){
  generatePointTable(Participants);
}

  return(
    <>
     {userType==="Organizer"?<NavbarOrg/>:userType==="Fan"?<NavbarFan/>:<NavbarPlayer/>}
    <div class='content-wrapper'>
    <div class='container-fluid tournament-container'>
    <h1>point Table</h1>
     <table>
    <thead>
    <tr>
      <th>Rank</th>
      <th>Participant ID</th>
      <th>Matches Played</th>
      <th>Matches Won</th>
      <th>Matches Lost</th>
      <th>Total Points</th>
      <th>
      {userType==="Organizer" && orgId===userId && rankings.length===0?
      <button class='btn btn-success' onClick={getTable}>Generate Table</button>:null}  
      </th>
    </tr>
  </thead>
  <tbody>
    {result?rankings.map((ranking,index) => (
      <tr key={ranking.ranking_id}>
        <td>{index + 1}</td>
        <td>{ranking.team_name}</td>
        <td>{ranking.Match_palyed}</td>
        <td>{ranking.Match_won}</td>
        <td>{ranking.Match_lost}</td>
        <td>{ranking.Total_point}</td>
        <td></td>
      </tr>
    )):null} 
  </tbody>
</table>
<h1>Match List</h1>
<div class="large-table-3">
<table>
  <thead>
    <tr>
      <th>Match Number</th>
      <th>Start Time</th>
      <th>End Time</th>
      <th>Winner Team </th>
      <th>Loser Team </th>
      <th>Winner Score</th>
      <th>Loser Score</th>
      <th>Participant 1</th>
      <th>Participant 2</th>
      <th>
      {userType==="Organizer" && orgId===userId &&  matches.length===0?
      <button class='btn btn-success' onClick={genMatch}>Generate Matches</button>:null}
      </th>
    </tr>
  </thead>
  <tbody>
    {result ? matches.map((match) => (
      <tr key={match.Match_id}>
        <td>{match.Match_number}</td>
        <td>{match.Match_start_time}</td>
        <td>{match.Match_end_time}</td>
        <td>{match.Match_winner_Name}</td>
        <td>{match.Match_loser_Name}</td>
        <td>{match.w_score}</td>
        <td>{match.l_score}</td>
        <td>{match.participant_name_1}</td>
        <td>{match.participant_name_2}</td>
        <td>
      {userType==="Organizer" && orgId===userId?
      <button class='btn btn-success' onClick={() =>
        navigate(`/editmatch/${match.Match_id}`)
      } >Edit</button>:null}
      </td>
      </tr>
    )) : null}
  </tbody>
</table>

</div>

<h1>Participant List</h1>
     <table>
    <thead>
    <tr>
      <th>Id</th>
      <th>Team Name</th>
      <th>Team id</th>
    </tr>
  </thead>
  <tbody>
  {result?Participants.map((item) => (
      <tr key={item.participant_id}>
        <td>{item.participant_id}</td>
        <td>{item.team_name}</td> 
        <td>{item.team_id}</td> 
      </tr>
    )):null}
  </tbody>
</table>
</div>
</div>
    </>
  )

  // Use the ID to fetch the details of the item from the API and display them
  // ...
}
export default TournamentDetails;