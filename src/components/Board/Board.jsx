import React from "react";
import { Square } from "../Square/Square";
import "./board.css";
export class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        winner={this.props.winningSquares.includes(i) ? true : false}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  renderRow(i) {
    return (
      <div key={i} className="board-row">
        {this.renderSquare(i)}
        {this.renderSquare(i + 1)}
        {this.renderSquare(i + 2)}
      </div>
    );
  }
  renderBoard() {
    let board = [];
    let i = 0;
    do {
      board.push(this.renderRow(i));
      i += 3;
    } while (i < 9);

    return board;
  }

  render() {
    return <div>{this.renderBoard()}</div>;
  }
}
