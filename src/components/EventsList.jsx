import React, {useState} from "react";
import {useLocation} from "react-router-dom";
import EventCard from "./UI/eventCard/EventCard";

function EventsList({events, match}) {
  if (match) {
    console.log("ss");
  }

  return (
    <div id="events_list" className="events_list" style={{padding: "0 30px"}}>
      {events.map(event => (
        <EventCard event={event} key={event.id} />
      ))}
    </div>
  );
}

export default EventsList;
