import React from 'react';

const isMoveable = ({ i, j, selectedHorse: { pos, player }, position }) => {
  const ways = [[-1, -2], [-1, 2], [1, -2], [1, 2], [-2, -1], [-2, 1], [2, -1], [2, 1]];
  let x;
  let y;
  let m = ways.length;

  while(m--) {
    x = ways[m][0];
    y = ways[m][1];

    if (pos.x - x === i && pos.y - y === j) {
      return !position[i] || (position[i] && position[i][j] !== player);
    }
  }

  return false;
};

const Horse = (props) => (
  <span
    className={ `horse horse--${props.flag}` }
    role="img"
    aria-label="horse"
    onClick={ props.selectHorse }
  >
    &#128014;
  </span>
);

const Cell = (props) => {
  const { changePosition, col, position, row, selectHandler, selectedHorse, turn } = props
  const { pos, player } = selectedHorse
  const rowNodes = [];
  const select = horse => () => {
    const x = horse.pos.x;
    const y = horse.pos.y;

    if ((turn === 'first' && position[x][y] === 1)
      || (turn === 'second' && position[x][y] === 2))
    {
      selectHandler(horse)
    }

    if (
      !player || (pos.x === x && pos.y === y)
      || (turn === 'first' && position[x][y] === 1)
      || (turn === 'second' && position[x][y] === 2)
    ) {
    }
  }

  let horseProps;
  let horseNode;

  for (let i = 0; i < row; i++) {
    const colNodes = [];

    for (let j = 0;  j < col; j++) {
      horseNode = null;

      if (position[i] && position[i][j]) {
        const flag = position[i][j];
        horseProps = {
          selectHorse: select({
            pos: { x: i, y: j },
            player: flag,
          }),
          flag: flag === 1 ? 'blue' : 'black'
        }
        horseNode = <Horse { ...horseProps } />;
      }

      const cellProps = {
        key: j
      };
      let colClassName = 'board__col';

      if (Object.keys(pos).length) {
        if (isMoveable({ selectedHorse, i, j, position })) {
          colClassName += ` board__col--${player === 1 ? 'blue' : 'black'}`;
          if (player) {
            cellProps.onClick = () => changePosition(i, j);
          }
        }
        if (i === pos.x && j === pos.y) {
          colClassName += ' board__col--selected';
        }
      }

      cellProps.className = colClassName;
      colNodes.push(
        <div { ...cellProps }>
          { horseNode }
        </div>
      );
    }

    rowNodes.push(
      <div key={ i } className="board__row">
        { colNodes }
      </div>
    )
  }

  return rowNodes
}

export default Cell;
