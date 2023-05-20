import React from "react";
import "./Landingpage.css";

function HeroSection() {
  return (
    <>
      <div className="hero-container">
        <img src="hero_bg.jpg" alt="Background" className="hero-background" />
        <div className="hero-content">
          <h1>Welcome to TourneyNet</h1>
          <p>The Ultimate <br></br>e-Sports Management Platform</p>
          <button className="hero-button">Get Started</button>
        </div>
      </div>
      <div className="land-content-1">
        <div className="land-content-1-heading">
          <h1>Feature</h1>
        </div>
        <div class="container-fluid land-content-1-body">
          <div className="row ">
            <div className="col-md-4">
              <div className="card">
                <div className="card card-Header land-card-head">
                  <h3>Players</h3>
                </div>
                <div className="card-body">
                  <ul>
                    <li>
                      Discover Events and Tournaments that Match Your Game
                      Preferences Manage Your Team, View Schedules, and Track
                      Your Stats and Rankings
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card card-Header land-card-head">
                  <h3>Organizers</h3>
                </div>
                <div className="card-body">
                  <ul>
                    <li>
                      Discover Events and Tournaments that Match Your Game
                      Preferences Manage Your Team, View Schedules, and Track
                      Your Stats and Rankings
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card card-Header land-card-head">
                  <h3>Fans</h3>
                </div>
                <div className="card-body">
                  <ul>
                    <li>
                      Discover Events and Tournaments that Match Your Game
                      Preferences Manage Your Team, View Schedules, and Track
                      Your Stats and Rankings
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="land-content-2">
        <div className="land-content-1-heading">
          <h1>Events</h1>
        </div>
        <div class="container-fluid land-content-1-body">
          <div className="row ">
            <div className="col-md-6">
              <img class="event-1" src="event_1.jpg" alt="Event-pic" />
            </div>
            <div className="col-md-6">
              <img class="event-1" src="event_2.jpg" alt="Event-pic" />
            </div>
          </div>
        </div>
      </div>

      <div className="land-content-3">
        <div className="land-content-1-heading">
          <h1>Partners</h1>
        </div>
        <div class="container-fluid land-content-1-body">
          <div className="partners-div">
            <img class="partner-img" src="discord1.jpg" alt="Event-pic" />
            <img class="partner-img" src="gigabyte1.jpg" alt="Event-pic" />
            <img class="partner-img" src="steam1.jpg" alt="Event-pic" />
            <img class="partner-img" src="xiaomi1.jpg" alt="Event-pic" />
            <img class="partner-img" src="letterS1.jpg" alt="Event-pic" />
          </div>
        </div>
      </div>
      <div className="land-content-4">
        <div class="container-fluid land-content-1-body">
          <div className="row ">
            <div className="col-md-6">
              <div class="zero-text-head">
                <h1>JOIN <br></br>TourneyNet TODAY!</h1>
              </div>
              <div>
                <ul>
                  <li>Sign Up as a Player, Organizer, or Fan</li>
                  <li>Experience the Ultimate E-Sports Management System</li>
                  <li>Take Your E-Sports Experience to the Next Level!</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <img class="event-1" src="pro_gamer.jpg" alt="Event-pic" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
