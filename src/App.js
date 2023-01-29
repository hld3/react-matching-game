import React, { useState } from 'react';
import Card from './components/card/Card';
import './App.css';

//! When moved to the App function everything breaks, figure out why.
const allCardIds = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
let availableCardIds = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
let board = [
  [randomCard(), randomCard(), randomCard(), randomCard()],
  [randomCard(), randomCard(), randomCard(), randomCard()],
  [randomCard(), randomCard(), randomCard(), randomCard()]
]

function randomCard() {
  const cardIdx = Math.floor(Math.random() * ((availableCardIds.length - 1) - 1) + 1);
  const cardId = availableCardIds[cardIdx];
  availableCardIds = availableCardIds.filter((val, idx) => idx !== cardIdx);
  return cardId;
}

export default function App() {

  const [flippedState, setFlippedState] = useState([[false, false, false, false], [false, false, false, false], [false, false, false, false]]);
  const [previousSelection, setPreviousSelection] = useState(undefined);
  const [clicks, setClicks] = useState(0);

  const restart = () => {
    availableCardIds = allCardIds;
    board = [
      [randomCard(), randomCard(), randomCard(), randomCard()],
      [randomCard(), randomCard(), randomCard(), randomCard()],
      [randomCard(), randomCard(), randomCard(), randomCard()]
    ]
  }

  const checkGameOver = () => {
    const flatState = flippedState.flatMap(state => state);
    if (flatState.every(s => s === true)) {
      setTimeout(() => {
        alert('You Won');
        const initialState = [[false, false, false, false], [false, false, false, false], [false, false, false, false]];
        setFlippedState(initialState);
        restart();
      }, 500);
    }
  }

  const onClick = (position) => {
    if (clicks >= 2) {
      return;
    }
    const currentState = flippedState[position[0]][position[1]];
    const newFlipped = [...flippedState]
    newFlipped[position[0]][position[1]] = !currentState;
    setFlippedState(newFlipped);

    let clickCount = clicks;
    setClicks(clickCount += 1);

    if (previousSelection) {
      if (board[previousSelection[0]][previousSelection[1]] !== board[position[0]][position[1]]) {
        setTimeout(() => {
          const newFlipped = [...flippedState];
          newFlipped[position[0]][position[1]] = false;
          newFlipped[previousSelection[0]][previousSelection[1]] = false;
          setFlippedState(newFlipped);
          setPreviousSelection(undefined);
          setClicks(0);
        }, 1000)
      } else {
        setPreviousSelection(undefined);
        setClicks(0);
      }
    } else {
      setPreviousSelection(position);
    }
    checkGameOver();
  }

  //! TODO look into making it more dynamic. Too much hard coding. Pain to update
  return (
    <div className="grid-container">
      <Card id={board[0][0]} onClick={onClick} position={[0, 0]} flipped={flippedState[0][0]} />
      <Card id={board[0][1]} onClick={onClick} position={[0, 1]} flipped={flippedState[0][1]} />
      <Card id={board[0][2]} onClick={onClick} position={[0, 2]} flipped={flippedState[0][2]} />
      <Card id={board[0][3]} onClick={onClick} position={[0, 3]} flipped={flippedState[0][3]} />
      <Card id={board[1][0]} onClick={onClick} position={[1, 0]} flipped={flippedState[1][0]} />
      <Card id={board[1][1]} onClick={onClick} position={[1, 1]} flipped={flippedState[1][1]} />
      <Card id={board[1][2]} onClick={onClick} position={[1, 2]} flipped={flippedState[1][2]} />
      <Card id={board[1][3]} onClick={onClick} position={[1, 3]} flipped={flippedState[1][3]} />
      <Card id={board[2][0]} onClick={onClick} position={[2, 0]} flipped={flippedState[2][0]} />
      <Card id={board[2][1]} onClick={onClick} position={[2, 1]} flipped={flippedState[2][1]} />
      <Card id={board[2][2]} onClick={onClick} position={[2, 2]} flipped={flippedState[2][2]} />
      <Card id={board[2][3]} onClick={onClick} position={[2, 3]} flipped={flippedState[2][3]} />
    </div>
  );
}

