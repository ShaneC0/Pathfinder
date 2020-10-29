import React from "react";

import Node from "./Node";
import { dijkstra } from "./dijkstra";
import { aStar } from "./astar";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      grid: [[]],
      rows: 20,
      cols: 50,
      startRow: 2,
      startCol: 2,
      endRow: 18,
      endCol: 48,
      clickMode: true, // false means editing end node, true means editing start node
    };
  }

  componentDidMount() {
    const grid = this.createGrid(this.state.rows, this.state.cols);
    this.setState({ grid });
  }

  async handleDijkstra() {
    const grid = this.state.grid;
    const startNode = grid[this.state.startRow][this.state.startCol];
    const endNode = grid[this.state.endRow][this.state.endCol];
    const nodesInVisitedOrder = dijkstra(grid, startNode, endNode);
    await this.animateFind(nodesInVisitedOrder);
    await this.animateShortestPath(endNode);
  }

  async handleAStar() {
    const grid = this.state.grid;
    const startNode = grid[this.state.startRow][this.state.startCol];
    const endNode = grid[this.state.endRow][this.state.endCol];
    const nodesInVisitedOrder = aStar(grid, startNode, endNode);
    await this.animateFind(nodesInVisitedOrder);
    await this.animateShortestPath(endNode);
  }

  async animateFind(nodesInVisitedOrder) {
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

  clear() {
    const tempGrid = this.createGrid(this.state.rows, this.state.cols);
    //figure out how to make the picture update
    this.setState({ grid: tempGrid });
  }

  handleClick(e) {
    const tempGrid = this.state.grid;

    if (this.state.clickMode) {
      document.getElementById(e.target.id).className = "node node-start";
      document.getElementById(
        `node-${this.state.startRow}-${this.state.startCol}`
      ).className = "node";
      const row = e.target.id.split("-")[1];
      const col = e.target.id.split("-")[2];
      tempGrid[row][col].isStart = !tempGrid[row][col].isStart;
      tempGrid[this.state.startRow][this.state.startCol].isStart = "false";
      this.setState({ grid: tempGrid, startRow: row, startCol: col });
    } else {
      document.getElementById(e.target.id).className = "node node-end";
      document.getElementById(
        `node-${this.state.endRow}-${this.state.endCol}`
      ).className = "node";
      const row = e.target.id.split("-")[1];
      const col = e.target.id.split("-")[2];
      tempGrid[row][col].isEnd = !tempGrid[row][col].isEnd;
      tempGrid[this.state.endRow][this.state.endCol].isEnd = "false";
      this.setState({ grid: tempGrid, endRow: row, endCol: col });
    }
  }

  createGrid(rows, cols) {
    const grid = [];
    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < cols; j++) {
        row.push(this.createNode(i, j));
      }
      grid.push(row);
    }
    return grid;
  }

  createNode(row, col) {
    return {
      row,
      col,
      previous: null,
      visited: false,
      isStart:
        col === this.state.startCol && row === this.state.startRow
          ? true
          : false,
      isEnd:
        col === this.state.endCol && row === this.state.endRow 
          ? true 
          : false,
      isWall: col === 20 && row > 1 && row < 15 ? true : false,
      distance: Infinity,
      g: Infinity,
      f: Infinity,
    };
  }

  render() {
    return (
      <div>
        <div className="pane">
          <div>
            <button onClick={() => this.handleAStar()} className="btn">
              A*
            </button>
            <button onClick={() => this.handleDijkstra()} className="btn">
              Dijkstra
            </button>
            <button onClick={() => this.clear()} className="btn">
              Clear
            </button>
            <button
              onClick={() =>
                this.setState((state) => ({
                  clickMode: !state.clickMode,
                }))
              }
              className="btn"
            >
              Toggle Click Mode: {this.state.clickMode ? "Start" : "End"}
            </button>
          </div>
          {this.state.grid.map((row, rowIndex) => (
            <div className="grid-row" key={rowIndex}>
              {row.map((node, nodeIndex) => (
                <Node
                  node={node}
                  key={nodeIndex}
                  id={`node-${node.row}-${node.col}`}
                  onClick={(e) => this.handleClick(e)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
