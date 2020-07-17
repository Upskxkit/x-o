import React, {useEffect, useState} from 'react';
import Cell from "./components/Cell";
import "./Board.css";
import {mark} from "./helpers";

function fabricDiagonals(size) {
  return new Array(size).fill(null).reduce((current, val, i, arr) => {
    const [l, r] = current;

    l.push(`${i},${i}`);
    r.push(`${i},${arr.length - 1 - i}`)

    return [l, r];
  }, [[], []]);
}

function checkBoard(board, size) {
  const o = [];
  const x = [];
  const leftDiagonal = 0;
  const rightDiagonal = 1;
  const diagonalsFab = fabricDiagonals(size);

  board.forEach((value, index) => {
    if (!value) {
      return;
    }

    if (value === 1) {
      o.push(index);
      return;
    }

    x.push(index);

  })

  if ((o.length < 3 && x.length < 3) || o.length === 0 || x.length === 0) {
    return [false, false];
  }


  const OX = [o, x].map(item => item.reduce((current, value) => {
    const {rows, columns, diagonals} = current;
    const col = value % size;
    const row = Math.floor(value / size);

    if (!rows.has(row)) {
      rows.set(row, 1);
    } else {
      rows.set(row, rows.get(row) + 1);
    }

    if (!columns.has(col)) {
      columns.set(col, 1);
    } else {
      columns.set(col, columns.get(col) + 1);
    }

    if (size % 2) {
      diagonals[leftDiagonal] += diagonalsFab[leftDiagonal].some(val => val === `${row},${col}`)
      diagonals[rightDiagonal] += diagonalsFab[rightDiagonal].some(val => val === `${row},${col}`)
    }

    return current;
  }, {rows: new Map(), columns: new Map(), diagonals: [0, 0]}));

  let isO = false;
  let isX = false;

  OX.forEach((item, index) => {
    const {rows, columns, diagonals} = item;
    console.log(diagonals);
    if (!index) {
      isO = [...rows.values()].some(item => item === size) || [...columns.values()].some(item => item === size)
        || diagonals.some(item => item === size);
    } else {
      isX = [...rows.values()].some(item => item === size) || [...columns.values()].some(item => item === size)
        || diagonals.some(item => item === size);
    }

  });

  return [isO, isX];
}

const Board = ({initBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0], initCurrent = 1}) => {
  const [board, setBoard] = useState(initBoard);
  const [current, setCurrent] = useState(initCurrent);
  const userName = mark(current);

  useEffect(() => {

    if (board.every(val => val === 0)) {
      return;
    }

    if (board.every(val => val !== 0)) {
      setBoard(initBoard);
      setCurrent(initCurrent);
      alert(`Ничия`);

      return;
    }

    let winner = null;
    const [o, x] = checkBoard(board, 3);

    if (o) {
      winner = "o";
    }
    if (x) {
      winner = "x";
    }

    if (!winner) {
      setCurrent(prev => prev === 1 ? 2 : 1);
      return;
    }

    setBoard(initBoard);
    setCurrent(initCurrent);
    alert(`${winner} - won the game;`);

  }, [board]);

  return (
    <>
      <h3>{userName} - move - {current}</h3>
      <button onClick={() => {
        setBoard(initBoard);
        setCurrent(initCurrent);
      }}>
        reset
      </button>
      <div className={`board ${userName}`}>
        {board.map((cell, index) => (<Cell key={index} className={current === 1 ? "o" : "x"} onClick={() => {
          if (board[index] !== 0) {
            alert("You can't overwrite other move!");
            return;
          }

          setBoard(prev => {
            const board = [...prev];
            board[index] = current;
            return board;
          });
        }} value={cell}/>))}
      </div>
    </>
  );
};

Board.propTypes = {};

export default Board;
