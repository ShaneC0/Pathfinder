const Node = (props) => {
  return (
    <div
      className={`node 
        ${props.node.isStart ? "node-start" : ""} 
        ${props.node.isEnd ? "node-end" : ""}
        ${props.node.isWall ? "node-wall" : ""}`}
      id={`node-${props.node.row}-${props.node.col}`}
      onMouseDown={() => props.onMouseDown(props.node.row, props.node.col)}
      onMouseEnter={() => props.onMouseEnter(props.node.row, props.node.col)}
      onMouseUp={() => props.onMouseUp()}
    ></div>
  );
};

export default Node;
