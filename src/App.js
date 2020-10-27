import React from "react";

import Node from "./Node";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      rows: 25,
      cols: 50,
    };
  }

  componentDidMount() {
    const grid = this.createGrid();
    this.setState({ grid });
  }

  createGrid = () => {
    const grid = [];
    for (let i = 1; i <= this.state.rows; i++) {
      let row = [];
      for (let j = 1; j <= this.state.cols; j++) {
        row.push(this.createNode(i, j));
      }
      grid.push(row);
    }
    return grid;
  };

  createNode = (row, col) => {
    return {
      variant: Math.random() > 0.5 ? 'start' : 'end',
      row,
      col,
    };
  };

  render() {
    return (
      <div>
        {this.state.grid.map((row) => (
          <div className="grid-row">
            {row.map((node) => (
              <Node variant={node.variant} />
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default App;
