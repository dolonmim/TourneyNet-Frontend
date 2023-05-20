import './App.css';
import Footer from './Components/Footer/Footer';
import Landingpage from './Components/Landingpage/Landingpage';
import Login from './Components/Login/Login';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import './interceptor';
import HomepagePlayer from './Components/Homepage/HomepagePlayer';
import Logout from './Components/Logout';
import Registration from './Components/Registration/Registration';
import HomepageOrg from './Components/Homepage/HomepageOrg';
import HomepageFans from './Components/Homepage/HomepageFan';
import Tournament from './Components/Tournament/Tournament';
import TournamentDetails from './Components/Tournament/TournamentDetails';
import Team from './Components/PlayerComponents/Team/Team';
import Editmatch from './Components/Tournament/Editmatch';
import ContactUs from './Components/ContactUs/ContactUs';
import Message from './Components/PlayerComponents/Message/Message';
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/homepage/player" element={<HomepagePlayer/>}/>
        <Route path="/homepage/org" element={<HomepageOrg/>}/>
        <Route path="/homepage/fan" element={<HomepageFans/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/signup" element={<Registration/>}/>
        <Route path="/tournament" element={<Tournament/>}/>
        <Route path="/view/:id" element={<TournamentDetails/>}/>
        <Route path="/editmatch/:id" element={<Editmatch/>}/>
        <Route path="/team" element={<Team/>}/>
        <Route path="/contactus" element={<ContactUs/>}/>  
        <Route path="/message" element={<Message/>}/>  
      </Routes>
    </Router>
    <Footer/>
    </>
  );
}

export default App;
