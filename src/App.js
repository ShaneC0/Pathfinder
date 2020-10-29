import React from "react";

import Node from "./Node";
import { dijkstra } from "./dijkstra";
import { aStar } from "./astar";

const startRow= 2
const startCol= 2
const endRow= 18
const endCol= 48

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      grid: [[]],
      rows: 20,
      cols: 50,
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = this.createGrid(this.state.rows, this.state.cols);
    this.setState({ grid });
  }

  async handleDijkstra() {
    const grid = this.state.grid;
    const startNode = grid[startRow][startCol];
    const endNode = grid[endRow][endCol];
    const nodesInVisitedOrder = dijkstra(grid, startNode, endNode);
    await this.animateFind(nodesInVisitedOrder);
    await this.animateShortestPath(endNode);
  }

  async handleAStar() {
    const grid = this.state.grid;
    const startNode = grid[startRow][startCol];
    const endNode = grid[endRow][endCol];
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

  handleMouseDown(row, col) {
    const tempGrid = getGridWithWall(this.state.grid, row, col)
    this.setState({grid: tempGrid, mouseIsPressed: true})
  }

  handleMouseEnter(row, col) {
    if(!this.state.mouseIsPressed) return
    const tempGrid = getGridWithWall(this.state.grid, row, col)
    this.setState({grid: tempGrid})
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false})
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
        col === startCol && row === startRow
          ? true
          : false,
      isEnd:
        col === endCol && row === endRow 
          ? true 
          : false,
      isWall: false,
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

const getGridWithWall = (grid, row, col) => {
  const tempGrid = grid.slice()
  const node = tempGrid[row][col]
  const newNode = {
    ...node,
    isWall: !node.isWall
  }
  tempGrid[row][col] = newNode;
  return tempGrid
}

export default App;
