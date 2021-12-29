import axios from "axios";
import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../../AuthContext";
import MyButton from "../button/MyButton";
import css from "./MainHeader.module.css";

function MainHeader({setModalActive}) {
  const {authUser, setAuthUser} = useContext(AuthContext);

  function logout() {
    axios.post("http://nurbeklu.beget.tech/api/v1/logout?token=" + authUser.token);
    setAuthUser(false);
    sessionStorage.removeItem("authUser");
  }

  return (
    <header id={css.header}>
      <h1>
        <Link to="/">Event Booking Platform</Link>
      </h1>
      <div>
        <span id={css.username}>{authUser ? authUser.username : ""}</span>
        {!authUser ? (
          <MyButton onClick={() => setModalActive(true)}>Login</MyButton>
        ) : (
          <MyButton style={{background: "rgb(255, 193, 7)"}} onClick={logout}>
            Logout
          </MyButton>
        )}
      </div>
    </header>
  );
}

export default MainHeader;
