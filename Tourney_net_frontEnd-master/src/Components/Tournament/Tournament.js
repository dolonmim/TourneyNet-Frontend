import { useState, useEffect } from "react";
import NavbarFan from "../Navbar/NavbarFan";
import NavbarOrg from "../Navbar/NavbarOrg";
import NavbarPlayer from "../Navbar/NavbarPlayer";
import { useNavigate } from "react-router-dom";
import "./Tournament.css";
import CreateTournament from "./CreateTournaments";
function Tournament() {
  const navigate = useNavigate();
  const userType = localStorage.getItem("user-info")
    ? JSON.parse(localStorage.getItem("user-info")).Type
    : null;
  const userID = localStorage.getItem("user-info")
    ? JSON.parse(localStorage.getItem("user-info")).reg_id
    : null;
  if (!localStorage.getItem("user-info")) {
    navigate("/login");
  }
  const [result, setResult] = useState();
  const [show, setShow] = useState(false);
  const [showRegester, setShowRegester] = useState(false);
  const [myteam, setmyteam] = useState();
  const [selectedTeam, setselectedTeam] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [preresult, setpreresult] = useState();
  const [selectedTournament, setselectedTournament] = useState();
  const [showregtour, setShowregtour] = useState(false); 

  useEffect(() => {
    async function getResult() {
      let result = await fetch("http://localhost:51753/api/tournaments", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      result = await result.json();
      var revresult = result.reverse();
      setResult(revresult);
      setpreresult(revresult);
    }
    
    async function getmyTeam() {
      let result = await fetch("http://localhost:51753/api/teams", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      result = await result.json();
      const myteam = result.filter(
        (obj) =>
          obj.Captain_id === userID ||
          obj.Player2_id === userID ||
          obj.Player3_id === userID ||
          obj.Player4_id === userID ||
          obj.Player5_id === userID
      );
      setmyteam(myteam);
    }
    getResult();
    getmyTeam();
  }, [userID]);
  function handleFilterChange() {
    const filteredresult = result.filter((obj) => obj.Organizer_Id === userID);
    setResult(filteredresult);
    setShow(false);
  }

  async function showTeams(prop) {
    setShowRegester(true);
    setselectedTournament(prop);
  }

  function handleCreateShow() {
    setShow(true);
  }
  async function registerHandle() {
    const team_name = selectedTeam[0].Team_name;
    const team_logo = selectedTeam[0].Team_logo;
    const team_id = selectedTeam[0].Team_id;
    const tournament_id = selectedTournament;
    let item = { tournament_id, team_name, team_logo, team_id };
    let result = await fetch("http://localhost:51753/api/participants/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(item),
    });
    result = await result.json();
    if (result) {
      setShowRegester(false);
    }
  }
        async function showRegistered() {
       setResult(result.filter((obj) => obj.tournament_id === 1));
        setShowregtour(true);
    }

    const handleSearch = () => {
      const filteredresult = result.filter((obj) => obj.tournament_name.includes(searchQuery));
      setResult(filteredresult);
      if(searchQuery ===""){
        setResult(preresult);
      }
    };


  return (
    <>
      {userType === "Organizer" ? (
        <NavbarOrg />
      ) : userType === "Fan" ? (
        <NavbarFan />
      ) : (
        <NavbarPlayer />
      )}
      <div class="content-wrapper">
        <div class="t-header">
          <h1>Tournaments</h1>
          {userType === "Player" ? (
            <button onClick={showRegistered} class="btn btn-primary">
              Show Registerd tournaments
            </button>
          ) : userType === "Organizer" ? (
            <div class="t-header-btn-grp">
              <button onClick={handleCreateShow} class="btn btn-primary">
                Create New tournaments
              </button>
              <button onClick={handleFilterChange} class="btn btn-primary">
                Show Created tournaments
              </button>
            </div>
          ) : null}
        </div>
        <div class="container-fluid tournament-container">
          <div class="row">
          {!showRegester && !show?
          <div class ='search-div'>
                    <input
                      type="text"
                      class="form-control"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search Players"
                    />
                    <button class='btn btn-primary' onClick={handleSearch}>Search</button>
                  </div>:null}
            {!showRegester && !show && result
              ? result.map((item) => (
                  <div class="col-lg-4 gy-4" key={item.tournament_id}>
                    <div class="card">
                      <div class="card-header">
                        <h3>{item.tournament_name}</h3>
                      </div>
                      <div class="card-body">
                        <div class="tournament-body">
                          <h6>{item.tournament_description}</h6>
                          <h2> Prizepool: {item.Prize} $</h2>
                          <h6>
                            Start Date:
                            {new Date(item.start_date).toLocaleDateString()}
                          </h6>
                          <h6>
                            End Date:{" "}
                            {new Date(item.end_date).toLocaleDateString()}
                          </h6>
                          <h6>
                            Deadline:{" "}
                            {new Date(
                              item.registration_deadline
                            ).toLocaleDateString()}
                          </h6>
                          <h6>Organized By: {item.Registration.UserName}</h6>
                        </div>
                        <div class="card-button">
                          {userType === "Player" ? (
                            <div class="button-group">
                              <button
                                onClick={() =>
                                  navigate(`/view/${item.tournament_id}`)
                                }
                                class="btn btn-primary"
                              >
                                View
                              </button>
                              {!showregtour ? (
                              <button
                                onClick={() => showTeams(item.tournament_id)}
                                class="btn btn-primary"
                              >
                                Register
                              </button>):null}
                            </div>
                          ) : (
                            <button
                              onClick={() =>
                                navigate(`/view/${item.tournament_id}`)
                              }
                              class="btn btn-primary"
                            >
                              View
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : null}
            {!showRegester && show ? (
              <CreateTournament />
            ) : showRegester && !show ? (
              <div class="row">
                <div class="col-md-6">
                  <div class="large-table-team-2">
                    <label>My Teams: {1 - selectedTeam.length} </label>
                    <table>
                      <thead>
                        <tr>
                          <th>Team Name</th>
                          <th>Select</th>
                        </tr>
                      </thead>
                      <tbody>
                        {myteam
                          ? myteam.map((item) => (
                              <tr key={item.Team_id}>
                                <td>{item.Team_name}</td>
                                <td>
                                  {selectedTeam.includes(item) ? (
                                    <button disabled class="btn btn-primary">
                                      Selected
                                    </button>
                                  ) : !selectedTeam.includes(item) &&
                                    selectedTeam.length < 1 ? (
                                    <button
                                      onClick={() =>
                                        setselectedTeam([...selectedTeam, item])
                                      }
                                      class="btn btn-primary"
                                    >
                                      Select
                                    </button>
                                  ) : (
                                    <button disabled class="btn btn-primary">
                                      Select
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))
                          : null}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="large-table">
                    <label>Selected Team:</label>
                    <table>
                      <thead>
                        <tr>
                          <th>Team Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedTeam
                          ? selectedTeam.map((item) => (
                              <tr key={item.Team_id}>
                                <td>{item.Team_name}</td>
                              </tr>
                            ))
                          : null}
                      </tbody>
                    </table>
                  </div>
                </div>
                <button
                  onClick={registerHandle}
                  class="btn btn-primary col-md-1"
                >
                  Register
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
export default Tournament;
