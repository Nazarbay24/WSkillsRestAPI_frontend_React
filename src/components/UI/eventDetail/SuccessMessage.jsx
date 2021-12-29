import React from "react";
import {CSSTransition} from "react-transition-group";
import css from "./EventDetail.module.css";

function SuccessMessage({isActive}) {
  return (
    <CSSTransition
      in={isActive}
      timeout={800}
      classNames={{
        enter: css.successMessage_enter,
        enterActive: css.successMessage_enterActive,
        exit: css.successMessage_exit,
        exitActive: css.successMessage_exitActive,
      }}
      mountOnEnter
      unmountOnExit
    >
      <div className={css.successMessage}>Регистрация прошла успешно</div>
    </CSSTransition>
  );
}

export default SuccessMessage;
