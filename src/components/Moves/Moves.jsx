import React from "react";
import styles from "./moves.module.scss";
export default function(props) {
  return props.history.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li
        key={move}
        className={
          styles["moves-list"] +
          " " +
          (move === props.stepNumber ? styles.selected : "")
        }
      >
        <button onClick={() => props.jumpTo(move)}>{desc}</button>
      </li>
    );
  });
}
