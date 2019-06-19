import React from "react";
import "./square.css";
export function Square(props) {
  return (
    <button
      className={props.winner ? "square winner" : "square"}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}
