import axios from "axios";
import React, {useState, useContext} from "react";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {AuthContext} from "../../AuthContext";
import MyButton from "../button/MyButton";
import css from "./LoginModal.module.css";

function LoginModal({isActive, setActive}) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [invalidLogin, setInvalidLogin] = useState("");
  const {authUser, setAuthUser} = useContext(AuthContext);
  const [blockScale, setBlockScale] = useState(false);

  async function loginFetch() {
    try {
      let response = await axios.post("http://nurbeklu.beget.tech/api/v1/login", {
        lastname: login,
        registration_code: password,
      });

      const response_2 = await axios.get("http://nurbeklu.beget.tech/api/v1/registrations?token=" + response.data.token);

      response.data.registrations = await response_2.data.registrations;
      setAuthUser(response.data);
      sessionStorage.setItem("authUser", JSON.stringify(response.data));
      modalClose();
    } catch (err) {
      if (err.response.status == 401) {
        setInvalidLogin("Lastname or registration code not correct");
      } else {
        alert(err.response.data.message);
      }
    }
  }

  function modalClose() {
    setActive(false);
    setPassword("");
    setLogin("");
    setInvalidLogin("");
    setBlockScale(false);
  }

  return (
    <CSSTransition
      in={isActive}
      timeout={350}
      onEnter={() => setBlockScale(true)}
      classNames={{
        enter: css.wrap_enter,
        enterActive: css.wrap_enterActive,
        exit: css.wrap_exit,
        exitActive: css.wrap_exitActive,
      }}
      mountOnEnter
      unmountOnExit
    >
      <div id={css.login_wrapper}>
        <CSSTransition
          in={blockScale}
          timeout={350}
          classNames={{
            enter: css.block_enter,
            enterActive: css.block_enterActive,
            exit: css.block_exit,
            exitActive: css.block_exitActive,
          }}
        >
          <div id={css.login_block}>
            <div id={css.invalid_text}>{invalidLogin}</div>
            <div id={css.modal_title}>Login</div>

            <div id={css.login_close_btn} onClick={modalClose}>
              x
            </div>

            <div id={css.inputs} style={{display: "flex"}}>
              <div style={{marginRight: "45px"}}>
                <div style={{marginTop: "3px"}}>Lastname</div>
                <div style={{marginTop: "15px"}}>Registration Code</div>
              </div>

              <div>
                <input value={login} onChange={e => setLogin(e.target.value)} type="text" placeholder="Lastname" style={{display: "block"}} />
                <input
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                  placeholder="Code"
                  style={{display: "block", marginTop: "10px"}}
                />

                <MyButton onClick={loginFetch} style={{marginTop: "36px"}}>
                  Login
                </MyButton>
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>
  );
}

export default LoginModal;
