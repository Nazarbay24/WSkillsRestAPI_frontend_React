import React from "react";

function Workshop({session, fetchSessionIds, setFetchSessionIds, workshopsCost, setWorkshopsCost}) {
  function selectWorkshop(checked) {
    if (checked) {
      setFetchSessionIds([...fetchSessionIds, session.id]);
      setWorkshopsCost(workshopsCost + Number(session.cost));
    } else {
      setFetchSessionIds(fetchSessionIds.filter(id => id !== session.id));
      setWorkshopsCost(workshopsCost - Number(session.cost));
    }
  }

  return (
    <label>
      <input type="checkbox" onChange={e => selectWorkshop(e.target.checked)} />
      <span>{session.title}</span>
    </label>
  );
}

export default Workshop;
