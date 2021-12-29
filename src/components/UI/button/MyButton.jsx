import React from "react";
import css from "./MyButton.module.css";

function MyButton({children, disabled, ...props}) {
  return (
    <button {...props} className={disabled ? css.myBtn + " " + css.disabled : css.myBtn}>
      {children}
    </button>
  );
}

export default MyButton;
