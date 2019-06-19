import React from "react";

export class GameInfo extends React.Component {
  render() {
    return (
      <div>
        <div> {this.props.status}</div>
        <div>
          <button onClick={this.props.movesToggleButton}>
            {" "}
            Toggle Moves Ordering
          </button>{" "}
        </div>
        <ol>
          {this.props.desc ? this.props.moves.reverse() : this.props.moves}
        </ol>
      </div>
    );
  }
}
