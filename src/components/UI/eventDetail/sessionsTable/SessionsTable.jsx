import React, {useState} from "react";
import {useNavigate} from "react-router";
import classes from "./SessionsTable.module.css";

function SessionsTable({channels, sessionClick, userSessions}) {
  let channels_jsx;

  if (channels) {
    channels_jsx = channels.map(channel => (
      <tr key={channel.id}>
        <td className={classes.channel_name}>{channel.name}</td>
        <td className={classes.rooms_name}>
          {channel.rooms.map(room => (
            <div key={room.id}>{room.name}</div>
          ))}
        </td>
        <td id={classes.sessions_name} className="sessions_name">
          {channel.rooms.map(room => (
            <div key={room.id} className={classes.session_div}>
              {room.sessions.map(function (session) {
                let session_position = (new Date(session.start).getHours() * 60 - 540 + new Date(session.start).getMinutes()) * 2;
                let session_width = (new Date(session.end).getHours() * 60 - 540 + new Date(session.end).getMinutes()) * 2 - session_position;
                let elem_class = classes.session;

                if (userSessions) {
                  userSessions.forEach(item => {
                    if (session.id == item) {
                      elem_class = classes.session + " " + classes.registered;
                    }
                  });

                  if (session.type == "talk") {
                    elem_class = classes.session + " " + classes.registered;
                  }
                }

                return (
                  <span
                    onClick={() => sessionClick(session.id)}
                    style={{left: session_position, width: session_width, height: "auto"}}
                    className={elem_class}
                    key={session.id}
                  >
                    {session.title}
                  </span>
                );
              })}
            </div>
          ))}
        </td>
      </tr>
    ));
  }

  return (
    <div id={classes.table_container}>
      <table id={classes.sessions_table}>
        <thead>
          <tr>
            <th style={{minWidth: "130px", textAlign: "left", color: "#808080"}}>Channel</th>
            <th style={{minWidth: "100px", textAlign: "left", color: "#808080"}}>Room</th>
            <th
              style={{
                position: "relative",
                width: "1000px",
                height: "25px",
                color: "#808080",
              }}
            >
              <div id={classes.time9}>9:00</div>
              <div id={classes.time11}>11:00</div>
              <div id={classes.time13}>13:00</div>
              <div id={classes.time15}>15:00</div>
              <div id={classes.time17}>17:00</div>
            </th>
          </tr>
        </thead>

        <tbody>{channels_jsx}</tbody>
      </table>
    </div>
  );
}

export default SessionsTable;
