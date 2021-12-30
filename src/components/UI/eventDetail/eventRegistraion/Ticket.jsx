import React from "react";
import css from "./EventRegistration.module.css";

function Ticket({ticket, fetchTicketId, setFetchTicketId, setTicketCost}) {
  function selectTicket(checked) {
    if (checked) {
      setFetchTicketId(ticket.id);
      setTicketCost(Number(ticket.cost));
    } else {
      setFetchTicketId(false);
      setTicketCost(0);
    }
  }

  return (
    <label className={ticket.available ? css.ticket : css.ticket + " " + css.unavailable}>
      <input type="checkbox" onChange={e => selectTicket(e.target.checked)} checked={fetchTicketId == ticket.id} disabled={ticket.available ? false : true} />
      <div style={{width: "100%"}}>
        <span style={{fontWeight: 400}}>{ticket.name}</span>
        <span style={{fontWeight: 400, float: "right"}}>{ticket.cost}</span>
        <br />
        <span>{ticket.available ? ticket.description : "unavailable"}</span>
      </div>
    </label>
  );
}

export default Ticket;
