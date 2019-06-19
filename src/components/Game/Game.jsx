import React from "react";
import { Board } from "../Board/Board";
import { GameInfo } from "../GameInfo/GameInfo";
import "./game.css";
import { calculateWinner } from "../../utils/calculateWinner";
import Moves from "../Moves/Moves";

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          moveCoordinates: [null, null]
        }
      ],
      xIsNext: true,
      stepNumber: 0,
      desc: false,
      winningSquares: []
    };
  }
  squareClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const moveRow = Math.ceil((i + 1) / 3);
    const moveColumn = (i % 3) + 1;

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          moveCoordinates: [moveColumn, moveRow]
        }
      ]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
      winningSquares: []
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  movesToggleButton() {
    this.setState({ desc: !this.state.desc });
  }

  setStatus(winner, current) {
    let status;
    if (winner) {
      status = "Winner: " + winner.player;
    } else if (!current.squares.includes(null)) {
      status = "#### Draw ####";
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
    return status;
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = Moves({
      history: this.state.history,
      stepNumber: this.state.stepNumber,
      jumpTo: this.jumpTo.bind(this)
    });
    let status = this.setStatus(winner, current);

    return (
      <div className="game">
        <div className="game-board">
          <Board
            onClick={i => this.squareClick(i)}
            squares={current.squares}
            winningSquares={winner ? winner.winningSquares : []}
          />
        </div>
        <div className="game-info">
          <GameInfo
            movesToggleButton={() => this.movesToggleButton()}
            status={status}
            desc={this.state.desc}
            moves={moves}
          />
        </div>
      </div>
    );
  }
}
