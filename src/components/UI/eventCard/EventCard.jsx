import React from "react";
import classes from "./EventCard.module.css";
import {Route, Routes, useNavigate} from "react-router-dom";
import EventDetail from "../eventDetail/EventDetail";

function EventCard({event}) {
  const navigate = useNavigate();

  function eventClick() {
    navigate(`event/${event.organizer.slug}/${event.slug}`);
  }

  return (
    <div className={classes.eventCard} onClick={eventClick}>
      <h2>{event.name}</h2>
      <span>{event.organizer.name + " | " + event.date}</span>
    </div>
  );
}

export default EventCard;
