import React from "react";

import Node from "./Node";
import { aStar } from "./astar";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      rows: 40,
      cols: 75,
    };
  }

  componentDidMount() {
    const grid = createGrid(this.state.rows, this.state.cols);
    this.setState({ grid });
  }

  render() {
    return (
      <div>
        <div>
          {this.state.grid.map((row, rowIndex) => (
            <div className="grid-row" key={rowIndex}>
              {row.map((node, nodeIndex) => (
                <Node node={node} key={nodeIndex} />
              ))}
            </div>
          ))}
        </div>
        <button>A*</button>
      </div>
    );
  }
}

const handleAStar = () => {
  //NEED TO GET START AND END NODES 

  const shortestPath = aStar(this.state.grid);
};

const createGrid = (rows, cols) => {
  const grid = [];
  for (let i = 1; i <= rows; i++) {
    let row = [];
    for (let j = 1; j <= cols; j++) {
      row.push(createNode(i, j));
    }
    grid.push(row);
  }
  return grid;
};

//f(n) = estimatedShortestPath
//g(n) = costFromStart
//h(n) = heuristicValue

const createNode = (row, col) => {
  return {
    row,
    col,
    previous: null,
    visited: false,
    isStart: col == 10 && row == 10 ? true : false,
    isEnd: col == 60 && row == 30 ? true : false,
    distance: Infinity,
    estimatedShortestPath: Infinity,
    costFromStart: 0,
    heuristicValue: 0,
  };
};

export default App;
