import React from "react";
import css from "./Loader.module.css";

function Loader() {
  return (
    <div class={css.cssload_container}>
      <div class={css.cssload_whirlpool}></div>
    </div>
  );
}

export default Loader;
