import { useState } from "react";
function CreateTournament() {
  const userID = localStorage.getItem("user-info")
    ? JSON.parse(localStorage.getItem("user-info")).reg_id
    : null;
  const [tournamentName, setTournamentName] = useState("");
  const [tournamentDescription, setTournamentDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [registrationDeadline, setRegistrationDeadline] = useState("");
  const [tournamentRules, setTournamentRules] = useState("");
  const [prize, setPrize] = useState("");

  async function handleCreateTournament() {
    const tournamentData = {
      tournament_name: tournamentName,
      tournament_description: tournamentDescription,
      start_date: startDate,
      end_date: endDate,
      registration_deadline: registrationDeadline,
      tournament_rules: tournamentRules,
      prize: prize,
      Organizer_Id: userID,
    };
    let result = await fetch("http://localhost:51753/api/tournaments/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(tournamentData),
    });
    result = await result.json();
    if (result) {
      window.location.reload();
    }
  }

  return (
    <>
      <div className="container">
        <div className="login-div">
          <h3>Create Tournament</h3>
          <br />
          <input
            value={tournamentName}
            onChange={(e) => setTournamentName(e.target.value)}
            type="text"
            placeholder="Tournament Name"
            className="form-control"
          />
          <br />
          <textarea
            value={tournamentDescription}
            onChange={(e) => setTournamentDescription(e.target.value)}
            placeholder="Tournament Description"
            className="form-control"
          />
          <br />
          <input
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            type="date"
            placeholder="Start Date"
            className="form-control"
          />
          <br />
          <input
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            type="date"
            placeholder="End Date"
            className="form-control"
          />
          <br />
          <input
            value={registrationDeadline}
            onChange={(e) => setRegistrationDeadline(e.target.value)}
            type="date"
            placeholder="Registration Deadline"
            className="form-control"
          />
          <br />
          <textarea
            value={tournamentRules}
            onChange={(e) => setTournamentRules(e.target.value)}
            placeholder="Tournament Rules"
            className="form-control"
          />
          <br />
          <input
            value={prize}
            onChange={(e) => setPrize(e.target.value)}
            type="text"
            placeholder="Prize"
            className="form-control"
          />
          <br />
          <button onClick={handleCreateTournament} className="btn btn-primary">
            Create Tournament
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateTournament;
