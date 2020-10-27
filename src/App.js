import React from "react";

import Grid from "./components/Grid";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodeList: [],
      cols: 50,
      rows: 50
    };
  }

  componentDidMount() {
    this.getNodes();
  }

  getNodes() {
    const nodes = [];
    for(let i = 0; i < this.state.cols; i++) {
      for(let j = 0; j < this.state.rows; j++) {
        nodes.push({
          variant: 'default',
          row: j,
          col: i
        })
      }
    }
    this.setState({nodeList: nodes})
  }

  render() {
    return (
      <div>
        <Grid nodes={this.state.nodeList} />
      </div>
    );
  }
}

export default App;
