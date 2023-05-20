import { useEffect } from "react";
import { useState } from "react";
import NavbarPlayer from "../../Navbar/NavbarPlayer";
import "./Message.css";

function Message() {
  const userID = JSON.parse(localStorage.getItem("user-info")).reg_id;
  const [myteam, setmyteam] = useState([]);
  const [selectedteam, setselectedteam] = useState("Team Name");
  const [selectedteam_id, setselectedteam_id] = useState();
  const [message, setmessage] = useState([]);
  const [reg, setreg] = useState([]);
  const [allmessage, setallmessage] = useState([]);
  const [messageText, setmessageText] = useState("");

  useEffect(() => {
    async function getTeam() {
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
    }
    getTeam();
    async function getMessage() {
        let result = await fetch("http://localhost:51753/api/teamcommunications", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        result = await result.json();
        setallmessage(result);
        setmessage(result);
      }
      getMessage();

      async function getReg() {
        let reg = await fetch("http://localhost:51753/api/reg", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        reg = await reg.json();
        setreg(reg);
      }
        getReg();

  }, [userID]);

  async function getMessage() {
    let result = await fetch("http://localhost:51753/api/teamcommunications", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    result = await result.json();
    setallmessage(result);
  }
  function idToName(id) {
    let forname = reg.filter((obj) => obj.Id === id);
    return forname[0].UserName;
  }

    const handleMessage = (team_id,team_name) => (e) => { 
        setselectedteam(team_name);
        setselectedteam_id(team_id);
        getMessage();
        const filteredmessage = allmessage.filter(
            (obj) => obj.Team_id === team_id
          );
          setmessage(filteredmessage);
    }

   async function handleSend(){
        const msgData = {  
            Team_id: selectedteam_id,
            Sender_id: userID,
            Receiver_id: 0,
            Message: messageText,
            Timestamp: new Date().toLocaleString(),
        }  
          let result = await fetch("http://localhost:51753/api/teamcommunications/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(msgData),
          });
          result = await result.json();
          if (result) {
            message.push(msgData);
            setmessageText("");
          }
        }

  return (
    <>
      <NavbarPlayer />
      <div class="content-wrapper">
        <div class="container-fluid tournament-container">
          <div class="row">
            <div class="col-md-4">
              <div class="large-table">
                <label>My Teams:</label>
                <div class="team-btn-list"> 
                    {myteam
                      ? myteam.map((item) => (
                          <div class='team-btn' key={item.Id}>
                            <button onClick={handleMessage(item.Team_id,item.Team_name)} class='btn btn-primary single-btn'>{item.Team_name}</button>
                          </div>
                        ))
                      : null}
                </div>
              </div>
            </div>
            <div class="col-md-8">
                <div class="Message-content">
                    <div class="Message-header">
                        <h3>{selectedteam}</h3>
                    </div>
                    <div class="Message-body">
                    {message && selectedteam!=="Team Name" ? message.map((item) => (
                        item.Sender_id===userID?
                         <div class="Message-body-content-1">
                            <div class='msg-group'>
                            <p class='flex-end'>{idToName(item.Sender_id)}</p>
                            <h6>{item.Message}</h6>
                            </div>  
                         </div>:
                        <div class="Message-body-content-2">
                            <div class='msg-group'>
                            <p class='flex-end-2'>{idToName(item.Sender_id)}</p>
                            <h6>{item.Message}</h6>
                            </div> 
                         </div>
                    )):null}
                    </div>
                    <div class="Message-footer d-flex">
                        <input value={messageText} onChange={(e)=>setmessageText(e.target.value)} class='form-control' type="text" placeholder="Type your message here..."/>
                        <button onClick={handleSend} class='btn btn-primary'>Send</button>
                    </div> 
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Message;
