import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router";
import SessionDetail from "./sessionDetail/SessionDetail";
import SessionsTable from "./sessionsTable/SessionsTable";
import classes from "./EventDetail.module.css";
import {Route, Routes, useLocation} from "react-router-dom";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {AuthContext} from "../../AuthContext";
import EventRegistraion from "./eventRegistraion/EventRegistraion";
import SuccessMessage from "./SuccessMessage";
import Loader from "../loader/Loader";

function EventDetail({setLoginModal}) {
  const {authUser} = useContext(AuthContext);
  const [event, setEvent] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [userSessions, setUserSessions] = useState("");
  const params = useParams();
  const event_name = params.event.replace(/ /g, "-");
  const location = useLocation();

  async function fetchEvent() {
    try {
      const response = await axios.get(`http://nurbeklu.beget.tech/api/v1/organizers/${params.organizer}/events/${event_name}`);
      setEvent(response.data);
    } catch (err) {
      if (err.response.status == 404) {
        alert(err.response.data.message);
      } else {
        alert(err);
        navigate("/");
      }
    }
  }

  const navigate = useNavigate();
  function sessionDetailShow(id) {
    navigate(`session/${id}`);
  }
  function popupClose() {
    navigate("");
  }

  function registrationBlockShow() {
    if (authUser) {
      navigate("registration");
    } else {
      setLoginModal(true);
    }
  }

  function userRegistCheck() {
    if (authUser) {
      authUser.registrations.forEach(item => {
        if (item.event.id == event.id) {
          setUserSessions(item.session_ids);
        }
      });
    } else {
      setUserSessions("");
    }
  }
  useEffect(() => {
    fetchEvent();
  }, []);
  useEffect(() => {
    userRegistCheck();
  }, [authUser, event]);

  if (event) {
    return (
      <div id={classes.event_detail} className="event_detail">
        <div id={classes.event_header}>
          <h2>{event.name}</h2>
          <div>{userSessions ? <div id={classes.registered}>Registered</div> : <button onClick={registrationBlockShow}>Register for this event</button>}</div>
        </div>

        <SessionsTable channels={event.channels} sessionClick={sessionDetailShow} userSessions={userSessions} />
        <TransitionGroup>
          <CSSTransition key={location.key} timeout={600}>
            <Routes location={location}>
              <Route path="session/:session_id" element={<SessionDetail sessionClose={popupClose} channels={event.channels} />} />
              <Route path="registration" element={<EventRegistraion close={popupClose} event={event} setSuccessMessage={setSuccessMessage} />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>

        <SuccessMessage isActive={successMessage} />
      </div>
    );
  } else {
    return <Loader />;
  }
}

export default EventDetail;
