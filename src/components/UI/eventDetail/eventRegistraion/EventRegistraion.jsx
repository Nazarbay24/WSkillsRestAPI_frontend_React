import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {AuthContext} from "../../../AuthContext";
import MyButton from "../../button/MyButton";
import css from "./EventRegistration.module.css";
import Ticket from "./Ticket";
import Workshop from "./Workshop";

function EventRegistraion({event, close, setSuccessMessage}) {
  const [fetchTicketId, setFetchTicketId] = useState(false);
  const [fetchSessionIds, setFetchSessionIds] = useState([]);
  const [ticketCost, setTicketCost] = useState(0);
  const [workshopsCost, setWorkshopsCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const params = useParams();
  const {authUser, setAuthUser} = useContext(AuthContext);

  if (!authUser) {
    close();
  }

  useEffect(() => {
    setTotalCost(ticketCost + workshopsCost);
  }, [ticketCost, workshopsCost]);

  async function fetchRegistration() {
    try {
      const response = await axios.post(
        `http://nurbeklu.beget.tech/api/v1/organizers/${params.organizer}/events/${event.slug}/registration?token=` + authUser.token,
        {
          ticket_id: fetchTicketId,
          session_ids: fetchSessionIds,
        }
      );
      setAuthUser({
        ...authUser,
        registrations: [
          ...authUser.registrations,
          {
            event,
            session_ids: fetchSessionIds,
          },
        ],
      });

      close();
      setSuccessMessage(true);
      setTimeout(() => {
        setSuccessMessage(false);
      }, 2000);
    } catch (err) {
      alert(err.response.data.message);
    }
  }

  if (event) {
    return (
      <div id={css.registration_block} className="reg_block">
        <h2 id={css.event_name}>{event.name}</h2>

        <div id={css.tickets_list}>
          {event.tickets.map(ticket => {
            return <Ticket key={ticket.id} ticket={ticket} fetchTicketId={fetchTicketId} setFetchTicketId={setFetchTicketId} setTicketCost={setTicketCost} />;
          })}
        </div>

        <div id={css.workshops}>
          <span>Select additional workshops you want to book:</span>
          <div id={css.workshops_list}>
            {event.channels.map(channel => {
              return channel.rooms.map(room => {
                return room.sessions.map(session => {
                  if (session.type == "workshop") {
                    return (
                      <Workshop
                        key={session.id}
                        session={session}
                        fetchSessionIds={fetchSessionIds}
                        setFetchSessionIds={setFetchSessionIds}
                        workshopsCost={workshopsCost}
                        setWorkshopsCost={setWorkshopsCost}
                      />
                    );
                  }
                });
              });
            })}
          </div>
        </div>

        <div onClick={close} id={css.close_btn}>
          x
        </div>

        <div id={css.cost_container}>
          <div>
            <div>
              <span>Event ticket:</span>
              <span id={css.ticket_cost}>{ticketCost}</span>
            </div>
            <div>
              <span>
                <span id={css.mobile_workshop_cost}>Additional</span> workshops:
              </span>
              <span id={css.workshops_cost}>{workshopsCost}</span>
            </div>
            <div id={css.cost_line}></div>
            <div>
              <span style={{fontWeight: "bold"}}>Total:</span>
              <span id={css.total_cost}>{totalCost}</span>
            </div>
          </div>

          <MyButton disabled={fetchTicketId ? false : true} id={css.purchase_btn} onClick={fetchRegistration}>
            Purchase
          </MyButton>
        </div>
      </div>
    );
  } else {
    return " ";
  }
}

export default EventRegistraion;
