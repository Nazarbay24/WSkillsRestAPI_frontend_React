import React from "react";
import {useParams} from "react-router-dom";
import Loader from "../../loader/Loader";
import classes from "./SessionDetail.module.css";

function SessionDetail({channels, sessionClose}) {
  let session;
  let {session_id} = useParams();

  if (channels) {
    channels.map(channel =>
      channel.rooms.map(room =>
        room.sessions.map(function (session_item) {
          if (session_item.id == session_id) {
            session = session_item;
          }
        })
      )
    );
  }

  if (session) {
    return (
      <div id={classes.session_detail} className="session_detail">
        <div onClick={sessionClose} id={classes.close_btn}>
          x
        </div>
        <div id={classes.session_title}>{session.title}</div>
        <div id={classes.session_description}>{session.description}</div>
        <div id={classes.session_info}>
          <span style={{marginRight: "15px", fontWeight: "400", color: "#7226ed"}}>
            Speaker:
            <br />
            <span>Start:</span>
            <br />
            <span>End:</span>
            <br />
            Type:
            <br />
            Cost:
            <br />
          </span>
          <span id={classes.session_info_insert}>
            {session.speaker}
            <br />
            {session.start}
            <br />
            {session.end}
            <br />
            {session.type}
            <br />
            {session.cost > 0 ? session.cost : "free"}
          </span>
        </div>
      </div>
    );
  } else {
    return <Loader />;
  }
}

export default SessionDetail;
