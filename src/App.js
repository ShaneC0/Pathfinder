import React from "react";

import Node from "./Node";
import { dijkstra } from "./algorithms/dijkstra";
import { aStar } from "./algorithms/astar";

const startRow = 2;
const startCol = 2;
const endRow = 18;
const endCol = 48;
const rows = 20;
const cols = 50;


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      grid: [[]],
      mouseIsPressed: false,
      searchStatus: 'Draw a grid and select an algorithm to start.'
    };
  }

  componentDidMount() {
    const grid = createGrid(rows, cols);
    this.setState({ grid });
  }

  async handleSort(algo) {
    const grid = this.state.grid;
    const startNode = grid[startRow][startCol];
    const endNode = grid[endRow][endCol];
    const nodesInVisitedOrder = algo(grid, startNode, endNode);
    if(!nodesInVisitedOrder) {
      this.setState({searchStatus: 'No solution.'})
    } else {
      this.setState({searchStatus: 'Searching...'})
      await this.animateSort(nodesInVisitedOrder);
      this.setState({searchStatus: 'Finding shortest path...'})
      await this.animateShortestPath(endNode);
      this.setState({searchStatus: 'Complete!'})
    }
    
  }

  async animateSort(nodesInVisitedOrder) {
    for (let i = 0; i < nodesInVisitedOrder.length; i++) {
      let node = nodesInVisitedOrder[i];
      document.getElementById(`node-${node.row}-${node.col}`).className +=
        "node-visited";
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

  handleMouseDown(row, col) {
    const tempGrid = getGridWithWall(this.state.grid, row, col);
    this.setState({ grid: tempGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const tempGrid = getGridWithWall(this.state.grid, row, col);
    this.setState({ grid: tempGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  clear() {
    let newGrid = [];
    for (let i = 0; i < this.state.grid.length; i++) {
      let row = [];
      for (let j = 0; j < this.state.grid[i].length; j++) {
        if (
          !(
            this.state.grid[i][j].isStart ||
            this.state.grid[i][j].isEnd ||
            this.state.grid[i][j].isWall
          )
        ) {
          document.getElementById(`node-${i}-${j}`).className = `node ${
            this.state.grid[i][j].isStart ? "node-start" : ""
          }
          ${this.state.grid[i][j].isEnd ? "node-end" : ""} ${
            this.state.grid[i][j].isWall ? "node-wall" : ""
          }`;
        }
        const newNode = {
          row: i,
          col: j,
          previous: null,
          visited: false,
          isStart: this.state.grid[i][j].isStart,
          isEnd: this.state.grid[i][j].isEnd,
          isWall: this.state.grid[i][j].isWall,
          distance: Infinity,
          g: Infinity,
          f: Infinity,
        };
        row.push(newNode);
      }
      newGrid.push(row);
    }
    this.setState({ grid: newGrid });
  }

  render() {
    return (
      <div>
        <div className="pane">
        <div className="status">{this.state.searchStatus}</div>
          <div>
            <button onClick={() => this.handleSort(aStar)} className="btn">
              A*
            </button>
            <button onClick={() => this.handleSort(dijkstra)} className="btn">
              Dijkstra
            </button>
            <button onClick={() => this.clear()} className="btn">
              Clear
            </button>
          </div>
          {this.state.grid.map((row, rowIndex) => (
            <div className="grid-row" key={rowIndex}>
              {row.map((node, nodeIndex) => (
                <Node
                  node={node}
                  key={nodeIndex}
                  onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                  mouseIsPressed={this.state.mouseIsPressed}
                  onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                  onMouseUp={() => this.handleMouseUp()}
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
    isStart: col === startCol && row === startRow ? true : false,
    isEnd: col === endCol && row === endRow ? true : false,
    isWall: false,
    distance: Infinity,
    g: Infinity,
    f: Infinity,
  };
};

const getGridWithWall = (grid, row, col) => {
  const tempGrid = grid.slice();
  const node = tempGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  tempGrid[row][col] = newNode;
  return tempGrid;
};

export default App;
