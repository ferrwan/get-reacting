import React, { PureComponent } from 'react';

import Cell from './Cell.jsx';

import '../styles/Board.css';

const createRandomPosition = ({ col, row, size }) => {
  const randomPos = [];

  while (randomPos.length < size) {
    const i = Math.floor(Math.random() * 100) % row;
    const j = Math.floor(Math.random() * 100) % col;
    let isSame = false;

    randomPos.forEach(a => {
      if (a[0] === i && a[1] === j) {
        isSame = true;
      }
    })

    if (isSame) {
      continue;
    }

    randomPos[randomPos.length] = [i, j];
  }

  const arr = [[]];
  let flag = 1;
  randomPos.forEach(pos => {
    if (!arr[pos[0]]) {
      arr[pos[0]] = [];
    }
    arr[pos[0]][pos[1]] = flag;
    flag = flag === 1 ? 2 : 1;
  });

  return arr;
}

export default class Board extends PureComponent {
  constructor() {
    super();

    this.state = {
      col: 3,
      row: 3,
      horses: 2,
      horsePosition: createRandomPosition({ col: 3, row: 3, size: 2 }),
      selectedHorse: {
        pos: {}
      },
      turn: 'first',
    };

    this.horseInputHandler = this.horseInputHandler.bind(this);
  }

  componentDidUpdate() {
    if (this.state.selectedHorse.player) {
      document.addEventListener('keyup', this.escHandler);
    } else {
      document.removeEventListener('keyup', this.escHandler);
    }
  }

  horseInputHandler(e) {
    const { value } = e.target;
    if (!isNaN(value)) {
      const { col, row } = this.state;
      const validValue = Math.min(e.target.value, col * row);
      if (this.state.horses !== validValue) {
        this.setState({
          horses: validValue,
          horsePosition: createRandomPosition({ col, row, size: validValue }),
          selectedHorse: {
            pos: {}
          }
        });
      }
    }
  }

  inputHandler(value, name) {
    if (!isNaN(value)) {
      this.setState({ [name]: Math.max(Math.min(value, 50), 3) })
    }
  }

  escHandler = (e) => {
    if (e.key === 'Escape') {
      this.setState({
        selectedHorse: { pos: {} }
      });
    }
  }

  selectHandler = (horse) => {
    const { selectedHorse: { pos } } = this.state;
    this.setState({
      selectedHorse: (pos.x !== horse.pos.x || pos.y !== horse.pos.y) ? horse : { pos: {} }
    });
  }

  changePosition = (i, j) => {
    console.log('run');
    const { horsePosition, selectedHorse: { pos, player }, turn } = this.state;
    const position = horsePosition.slice(0);
    if (!position[i]) {
      position[i] = [];
    }
    position[i][j] = player;
    position[pos.x][pos.y] = 0;

    this.setState({
      horsePosition: position,
      selectedHorse: { pos: {} },
      turn: turn === 'first' ? 'second' : 'first'
    });
  }

  counter = () => {
    const { horsePosition } = this.state;
    const c = {
      black: 0,
      blue: 0
    }

    horsePosition.forEach(arr => arr.forEach((h) => {
      if (h === 1) {
        c.blue += 1;
      } else if (h === 2) {
        c.black += 1;
      }
    }))

    return c;
  }

  render() {
    const { col, horses, horsePosition, row, selectedHorse, turn } = this.state;
    const cellProps = {
      changePosition: this.changePosition,
      col,
      position: horsePosition,
      row,
      selectHandler: this.selectHandler,
      selectedHorse,
      turn,
    };
    const count = this.counter();

    let turnText = `${turn === 'first' ? 'Blue' : 'Black'} Turn`
    if (count.blue === 0) {
      turnText = 'Black Horse Win'
    } else if (count.black === 0) {
      turnText = 'Blue Horse Win'
    }

    const turnElement = <h3>{ turnText }</h3>

    return (
      <div className="board">
        <div>
          <input
            value={ col }
            onChange={ e => this.inputHandler(e.target.value, 'col') }
          />
          <input
            value={ row }
            onChange={ e => this.inputHandler(e.target.value, 'row') }
          />
          <input
            value={ horses }
            onChange={ this.horseInputHandler }
          />
        </div>
        <div>
          <h2>
            <span className="count--blue">{ count.blue }</span>
            &nbsp; | &nbsp;
            <span className="count--black">{ count.black }</span>
          </h2>
          { turnElement }
        </div>
        <div className="board__container">
          <Cell { ...cellProps } />
        </div>
      </div>
    )
  }
}
