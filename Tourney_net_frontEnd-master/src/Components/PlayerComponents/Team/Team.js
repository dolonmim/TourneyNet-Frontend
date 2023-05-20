import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import NavbarOrg from "../../Navbar/NavbarOrg";
import NavbarFan from "../../Navbar/NavbarFan";
import NavbarPlayer from "../../Navbar/NavbarPlayer";
import "./Team.css";
function Team() {
  const navigate = useNavigate();
  const userType = localStorage.getItem("user-info")
    ? JSON.parse(localStorage.getItem("user-info")).Type
    : null;
  const userID = localStorage.getItem("user-info")
    ? JSON.parse(localStorage.getItem("user-info")).reg_id
    : null;
  const userName = localStorage.getItem("user-info")
    ? JSON.parse(localStorage.getItem("user-info")).User_id
    : null;
  const [Team_name, setTeam_name] = useState("");
  const [Team_logo, setTeam_logo] = useState("");
  if (!localStorage.getItem("user-info")) {
    navigate("/login");
  }
  const [result, setResult] = useState();
  const [preresult, setpreresult] = useState();
  const [myteam, setmyteam] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [show, setShow] = useState(false);
  const [selectedplayers, setselectedplayersPlayers] = useState([]);
  useEffect(() => {
    async function getResult() {
      let result = await fetch("http://localhost:51753/api/reg", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      result = await result.json();
      const filteredresult = result.filter(
        (obj) => obj.Type === "Player" && obj.Id !== userID
      );
      setResult(filteredresult);
      setpreresult(filteredresult);
      setTeam_logo("----");
    }
    getResult();
  }, [userID]);
  async function handlecreate() {
    let Player2_id = selectedplayers[0].Id;
    let Player3_id = selectedplayers[1].Id;
    let Player4_id = selectedplayers[2].Id;
    let Player5_id = selectedplayers[3].Id;
    let Captain_id = userID;
    let item = {
      Team_name,
      Team_logo,
      Captain_id,
      Player2_id,
      Player3_id,
      Player4_id,
      Player5_id,
    };
    let result = await fetch("http://localhost:51753/api/teams/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(item),
    });
    result = await result.json();
    if (result) {
      handlemyteamClick();
    }
  }
  async function handlemyteamClick() {
    let result = await fetch("http://localhost:51753/api/teams/", {
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
    setShow(!show);
  }

  const handleSearch = () => {
    const filteredresult = result.filter((obj) => obj.UserName.includes(searchQuery) ||obj.LastName.includes(searchQuery) ||obj.FirstName.includes(searchQuery) );
    setResult(filteredresult);
    if(searchQuery ===""){
      setResult(preresult);
    }
  };

  function idToName(id) {
    let forname = result.filter((obj) => obj.Id === id);
    if (forname.length === 0) {
      return userName;
    }
    return forname[0].UserName;
  }

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
          <h1>Team</h1>
          {!show ? (
            <button onClick={handlemyteamClick} class="btn btn-primary">
              My Teams
            </button>
          ) : (
            <button onClick={() => setShow(!show)} class="btn btn-primary">
              Create team
            </button>
          )}
        </div>
        {!show ? (
          <div class="container-fluid tournament-container">
            <label>Enter Team Name:</label>
            <input
              onChange={(e) => setTeam_name(e.target.value)}
              type="text"
              class="form-control"
            ></input>
            <div class="row">
              <div class="col-md-6">
                <div>
                <div class ='search-div'>
                    <input
                      type="text"
                      class="form-control"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search Players"
                    />
                    <button class='btn btn-primary' onClick={handleSearch}>Search</button>
                  </div>
                <div class ='large-table-team'>
                  
                  <label>Select Players:{4 - selectedplayers.length}</label>
                  <table>
                    <thead>
                      <tr>
                        <th>First Name</th>
                        <th>last Name</th>
                        <th>Email</th>
                        <th>UserName</th>
                        <th>Add</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result
                        ? result.map((item) => (
                            <tr key={item.Id}>
                              <td>{item.FirstName}</td>
                              <td>{item.LastName}</td>
                              <td>{item.Email}</td>
                              <td>{item.UserName}</td>
                              {selectedplayers.includes(item) &&
                              selectedplayers.length < 4 ? (
                                <button disabled class="btn btn-primary">
                                  Added
                                </button>
                              ) : selectedplayers.length < 4 ? (
                                <button
                                  class="btn btn-primary"
                                  onClick={() =>
                                    setselectedplayersPlayers([
                                      ...selectedplayers,
                                      item,
                                    ])
                                  }
                                >
                                  Add
                                </button>
                              ) : (
                                <button class="btn btn-primary" disabled>
                                  Add
                                </button>
                              )}
                            </tr>
                          ))
                        : null}
                    </tbody>
                  </table>
                  </div>
                </div>
                <button onClick={handlecreate} class="btn btn-primary">
                  Create Team
                </button>
              </div>
              <div class="col-md-6">
                <div class="large-table">
                  <label>Selected Players:</label>
                  <table>
                    <thead>
                      <tr>
                        <th>First Name</th>
                        <th>last Name</th>
                        <th>Email</th>
                        <th>UserName</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedplayers
                        ? selectedplayers.map((item) => (
                            <tr key={item.Id}>
                              <td>{item.FirstName}</td>
                              <td>{item.LastName}</td>
                              <td>{item.Email}</td>
                              <td>{item.UserName}</td>
                            </tr>
                          ))
                        : null}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div class="container-fluid tournament-container">
            <div class="large-table">
              <label>My Teams:</label>
              <table>
                <thead>
                  <tr>
                    <th>Team Name</th>
                    <th>Captain</th>
                    <th>Player2</th>
                    <th>Player3</th>
                    <th>Player4</th>
                    <th>Player5</th>
                  </tr>
                </thead>
                <tbody>
                  {myteam
                    ? myteam.map((item) => (
                        <tr key={item.Id}>
                          <td>{item.Team_name}</td>
                          <td>{idToName(item.Captain_id)}</td>
                          <td>{idToName(item.Player2_id)}</td>
                          <td>{idToName(item.Player3_id)}</td>
                          <td>{idToName(item.Player4_id)}</td>
                          <td>{idToName(item.Player5_id)}</td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default Team;
