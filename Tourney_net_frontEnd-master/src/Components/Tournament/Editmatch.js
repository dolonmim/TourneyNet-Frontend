import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavbarFan from "../Navbar/NavbarFan";
import NavbarOrg from "../Navbar/NavbarOrg";
import NavbarPlayer from "../Navbar/NavbarPlayer";

function Editmatch() {
    const { id } = useParams();
    const [extMatch, setExtMatch] = useState();
    const [table, setTable] = useState([]);
    const navigate = useNavigate();
    const userType = localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info')).Type : null;
    useEffect(() => {
        const url = "http://localhost:51753/api/matches/" + id;
        async function getMatch() {
            let result = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });
            result = await result.json();
            setExtMatch(result);
            setMatchWinnerName(result.Match_loser_Name);
            setMatchLoserName(result.Match_winner_Name);
            setWinnerScore(result.l_score);
            setLoserScore(result.w_score);
            setMatchStartTime(result.Match_start_time);
            setMatchEndTime(result.Match_end_time);
        }

        async function getTable() {
            let result = await fetch("http://localhost:51753/api/rankings", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });
            result = await result.json();
            setTable(result);
        }
        getTable();
        getMatch();
    }, [id]);

    const [matchStartTime, setMatchStartTime] = useState();
    const [matchEndTime, setMatchEndTime] = useState();
    const [matchWinnerName, setMatchWinnerName] = useState();
    const [matchLoserName, setMatchLoserName] = useState();
    const [winnerScore, setWinnerScore] = useState();
    const [loserScore, setLoserScore] = useState();


    async function updatePoints() {

        const team1 = table.filter((item) => item.team_name === matchWinnerName);
        const team2 = table.filter((item) => item.team_name === matchLoserName);

        const pointDetails1 = {
            ranking_id: team1[0].ranking_id,
            Match_palyed:team1[0].Match_palyed+1,
            Match_lost: team1[0].Match_lost,
            Match_won:team1[0].Match_won+1,
            Total_point: team1[0].Total_point+3,
            participant_id: team1[0].participant_id,
            tournament_id:team1[0].tournament_id,
            team_name: team1[0].team_name
        };
        const pointDetails2 = {
            ranking_id: team2[0].ranking_id,
            Match_palyed:team2[0].Match_palyed+1,
            Match_lost: team2[0].Match_lost+1,
            Match_won:team2[0].Match_won,
            Total_point: team2[0].Total_point,
            participant_id: team2[0].participant_id,
            tournament_id:team2[0].tournament_id,
            team_name: team2[0].team_name
        };
        await fetch("http://localhost:51753/api/rankings/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(pointDetails1),
        });
        await fetch("http://localhost:51753/api/rankings/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(pointDetails2),
        });       
    };
    async function handleEditMatchDetails() {
        const matchDetails = {
            Match_id: extMatch.Match_id,
            Match_number: extMatch.Match_number,
            Match_start_time: matchStartTime,
            Match_end_time: matchEndTime,
            Match_winner_Name: matchWinnerName,
            Match_loser_Name: matchLoserName,
            w_score: winnerScore,
            l_score: loserScore,
            participant_name_1: extMatch.participant_name_1,
            participant_name_2: extMatch.participant_name_2,
            Tournament_id: extMatch.Tournament_id,
        };
        let result = await fetch("http://localhost:51753/api/matches/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(matchDetails),
        });
        result = await result.json();
        if (result) {
            navigate(`/view/${extMatch.Tournament_id}`);
        }
        
        if(matchWinnerName!=="---"&& matchLoserName!=="---"){
            updatePoints();
        }
        setMatchStartTime("");
        setMatchEndTime("");
        setMatchWinnerName("");
        setMatchLoserName("");
        setWinnerScore("");
        setLoserScore("");
    }

    return (
        <>
        {userType==="Organizer"?<NavbarOrg/>:userType==="Fan"?<NavbarFan/>:<NavbarPlayer/>}
        <div className="container">
            <div className="login-div">
                <h3>Edit Match Details</h3>
                <br />
                <input
                    value={matchStartTime}
                    onChange={(e) => setMatchStartTime(e.target.value)}
                    type="datetime-local"
                    placeholder="Match Start Time"
                    className="form-control"
                />
                <br />
                <input
                    value={matchEndTime}
                    onChange={(e) => setMatchEndTime(e.target.value)}
                    type="datetime-local"
                    placeholder="Match End Time"
                    className="form-control"
                />
                <br />
                <input
                    value={matchWinnerName}
                    onChange={(e) => setMatchWinnerName(e.target.value)}
                    type="text"
                    placeholder="Match Winner Name"
                    className="form-control"
                />
                <br />
                <input
                    value={matchLoserName}
                    onChange={(e) => setMatchLoserName(e.target.value)}
                    type="text"
                    placeholder="Match Loser Name"
                    className="form-control"
                />
                <br />
                <input
                    value={winnerScore}
                    onChange={(e) => setWinnerScore(e.target.value)}
                    type="number"
                    placeholder="Winner's Score"
                    className="form-control"
                />
                <br />
                <input
                    value={loserScore}
                    onChange={(e) => setLoserScore(e.target.value)}
                    type="number"
                    placeholder="Loser's Score"
                    className="form-control"
                />
                <br />
                <button onClick={handleEditMatchDetails} className="btn btn-primary">
                    Save Changes
                </button>
            </div>
        </div>
        </>  
    );
}
export default Editmatch;
