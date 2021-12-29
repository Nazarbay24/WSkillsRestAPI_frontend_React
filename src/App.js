import axios from "axios";
import React, {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import "./app.css";
import {AuthContext} from "./components/AuthContext";
import EventsList from "./components/EventsList";
import EventDetail from "./components/UI/eventDetail/EventDetail";
import MainHeader from "./components/UI/header/MainHeader";
import LoginModal from "./components/UI/LoginModal/LoginModal";

function App() {
  const [events, setEvents] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [authUser, setAuthUser] = useState(false);
  async function fetchEvents() {
    try {
      const response = await axios.get("http://nurbeklu.beget.tech/api/v1/events");
      setEvents(response.data.events);
    } catch (err) {
      alert(err.response.data.message);
    }
  }
  useEffect(() => {
    fetchEvents();

    if (sessionStorage.getItem("authUser")) {
      setAuthUser(JSON.parse(sessionStorage.getItem("authUser")));
    }
  }, []);

  return (
    <AuthContext.Provider value={{authUser, setAuthUser}}>
      <LoginModal isActive={modalActive} setActive={setModalActive} />

      <MainHeader setModalActive={setModalActive} />

      <div id="content_container">
        <Routes>
          <Route path="/" element={<EventsList events={events} />} />
          <Route path="event/:organizer/:event/*" element={<EventDetail setLoginModal={setModalActive} />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
