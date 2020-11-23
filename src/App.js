import React, { Component } from 'react';
import './App.css';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      x_is_next: true,
      winner: null,
      winning_line: []
    }; 

    this.lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
      ]; 

      this.handle_click = this.handle_click.bind(this);
  }

  render_square(i) {
    const class_name = (this.state.squares[i] == null) ? "square" :
        (this.state.winner != null && 
        this.state.winner === this.state.squares[i]) &&
        this.state.winning_line.includes(i) ? 
        "square-winner" : "square-full";
    const enabled = (this.state.winner == null && this.state.squares[i] == null) ? true : false;
    const event_handler = (enabled) ? this.handle_click : ()=>{};
    const output = 
      <div>
        <div className={class_name} id={i}
          onClick={event_handler}>
          {(this.state.squares[i] != null) ? this.state.squares[i] : ""}
        </div>
      </div>
    ;   
    return output;
  }

  render() {
    let status;
    if(this.state.winner) {
      status = 'Winner: ' + this.state.winner;
    }else {
      status = 'Next player: ' + (this.state.x_is_next ? 'X' : 'O');
    }

    const output =  
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
            {this.render_square(0)}{this.render_square(1)}{this.render_square(2)}
        </div>
        <div className="board-row">
            {this.render_square(3)}{this.render_square(4)}{this.render_square(5)}
        </div>
        <div className="board-row">
            {this.render_square(6)}{this.render_square(7)}{this.render_square(8)}
        </div>
      </div>
      ;
      return output;
  }

  handle_click(event) {
    const id = event.target.id;
    let squares = Object.assign({}, this.state.squares);
    squares[id] = this.state.x_is_next ? 'X' : 'O';
    const the_winner = this.calculate_winner(squares);
    this.setState(
      {
      squares: squares,
      x_is_next: !this.state.x_is_next,
      winner: the_winner.player,
      winning_line: the_winner.winning_line
      }
    );
  }

  calculate_winner(squares) {
    for (let i = 0; i < this.lines.length; i++) {
      const [a, b, c] = this.lines[i];       
      if (squares[a] && 
      squares[a] === squares[b] && 
      squares[a] === squares[c]) {
        return {
          player: squares[a],
          winning_line: this.lines[i]
        };
      }
    }
    return {
      player: null,
      winning_line: []
    };
  }

}

export default App;