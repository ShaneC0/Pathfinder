const Node = (props) => {
  return (
    <div
      className={`node 
        ${props.node.isStart ? "node-start" : ""} 
        ${props.node.isEnd ? "node-end" : ""}
        ${props.node.isWall ? "node-wall" : ""}`}
      id={`node-${props.node.row}-${props.node.col}`}
      onClick={(e) => props.onClick(e)}
    ></div>
  );
};

export default Node;
