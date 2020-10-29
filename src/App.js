import React from "react";

import Node from "./Node";
import { dijkstra } from "./dijkstra";
import { aStar } from './astar'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      grid: [[]],
      rows: 20,
      cols: 50,
    };
  }

  componentDidMount() {
    const grid = createGrid(this.state.rows, this.state.cols);
    this.setState({ grid });
  }

  async handleDijkstra() {
    const grid = this.state.grid;
    const startNode = grid[5][10];
    const endNode = grid[18][48];
    const nodesInVisitedOrder = dijkstra(grid, startNode, endNode);
    await this.animateFind(nodesInVisitedOrder);
    await this.animateShortestPath(endNode);
  }

  async handleAStar() {
    const grid = this.state.grid;
    const startNode = grid[5][10];
    const endNode = grid[18][48];
    const nodesInVisitedOrder = aStar(grid, startNode, endNode);
    await this.animateFind(nodesInVisitedOrder);
    await this.animateShortestPath(endNode);
  }

  async animateFind(nodesInVisitedOrder) {
    for (let i = 0; i < nodesInVisitedOrder.length; i++) {
      let node = nodesInVisitedOrder[i];
      document.getElementById(`node-${node.row}-${node.col}`).className += 'node-visited'
      await new Promise((resolve) => setTimeout(resolve, 1));
    }
  }

  async animateShortestPath(endNode) {
    let current = endNode.previous;
    while (current.previous !== null) {
      document.getElementById(`node-${current.row}-${current.col}`).className =
        "node node-shortest";
      await new Promise((resolve) => setTimeout(resolve, 1));
      current = current.previous;
    }
  }

  render() {
    return (
      <div>
        <div className="pane">
          <div>
            <button onClick={() => this.handleAStar()} className="btn">A*</button>
            <button onClick={() => this.handleDijkstra()} className="btn">
              Dijkstra
            </button>
            <button className="btn">Clear</button>
          </div>
          {this.state.grid.map((row, rowIndex) => (
            <div className="grid-row" key={rowIndex}>
              {row.map((node, nodeIndex) => (
                <Node
                  node={node}
                  key={nodeIndex}
                  id={`node-${node.row}-${node.col}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const createGrid = (rows, cols) => {
  const grid = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      row.push(createNode(i, j));
    }
    grid.push(row);
  }
  return grid;
};

const createNode = (row, col) => {
  return {
    row,
    col,
    previous: null,
    visited: false,
    isStart: col === 10 && row === 5 ? true : false,
    isEnd: col === 48 && row === 18 ? true : false,
    distance: Infinity,
    g: Infinity,
    f: Infinity
  };
};

export default App;
