import React, { Component } from 'react';
import Card from './components/card/Card';
import './App.css';

const allCardIds = [1, 2, 1, 2];
let availableCardIds = [1, 2, 1, 2];
let board = [
  [randomCard(), randomCard()],
  [randomCard(), randomCard()]
]

function randomCard() {
  const cardIdx = Math.floor(Math.random() * ((availableCardIds.length - 1) - 1) + 1);
  const cardId = availableCardIds[cardIdx];
  availableCardIds = availableCardIds.filter((val, idx) => idx !== cardIdx);
  return cardId;
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      flippedState: [
        [false, false],
        [false, false]
      ],
      previousSelection: undefined,
      clicks: 0
    }
  }

  onClick = (position) => {
    if (this.state.clicks >= 2) {
      return;
    }
    const currentState = this.state.flippedState[position[0]][position[1]];
    const newFlipped = [...this.state.flippedState]
    newFlipped[position[0]][position[1]] = !currentState;
    this.setState({ flippedState: newFlipped });

    let clickCount = this.state.clicks;
    this.setState({ clicks: clickCount += 1 });

    if (this.state.previousSelection) {
      if (board[this.state.previousSelection[0]][this.state.previousSelection[1]] !== board[position[0]][position[1]]) {
        setTimeout(() => {
          const newFlipped = [...this.state.flippedState];
          newFlipped[position[0]][position[1]] = false;
          newFlipped[this.state.previousSelection[0]][this.state.previousSelection[1]] = false;
          this.setState({ flippedState: newFlipped });
          this.setState({ previousSelection: undefined });
          this.setState({ clicks: 0 });
        }, 1000)
      } else {
        this.setState({ previousSelection: undefined });
        this.setState({ clicks: 0 });
      }
    } else {
      this.setState({ previousSelection: position });
    }
    this.checkGameOver();
  }

  checkGameOver = () => {
    const flatState = this.state.flippedState.flatMap(state => state);
    if (flatState.every(s => s === true)) {
      setTimeout(() => {
        alert('You Won');
        const initialState = [[false, false], [false, false]];
        this.setState({ flippedState: initialState })
        this.restart();
      }, 500);
    }
  }

  restart = () => {
    availableCardIds = allCardIds;
    board = [
      [randomCard(), randomCard()],
      [randomCard(), randomCard()]
    ]
  }

  //! TODO stop from clicking more than 2 at a time.
  //! TODO look into making it more dynamic. Too much hard coding.

  render() {
    return (

      <div className="grid-container">
        <Card id={board[0][0]} onClick={this.onClick} position={[0, 0]} flipped={this.state.flippedState[0][0]} />
        <Card id={board[0][1]} onClick={this.onClick} position={[0, 1]} flipped={this.state.flippedState[0][1]} />
        <Card id={board[1][0]} onClick={this.onClick} position={[1, 0]} flipped={this.state.flippedState[1][0]} />
        <Card id={board[1][1]} onClick={this.onClick} position={[1, 1]} flipped={this.state.flippedState[1][1]} />
      </div>
    );
  }
}

export default App;