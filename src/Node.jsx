const Node = (props) => {
  return (
    <div
      className={`node 
        ${props.node.isStart ? "node-start" : ""} 
        ${props.node.isEnd ? "node-end" : ""}`}
      id={`node-${props.node.row}-${props.node.col}`}
    ></div>
  );
};

export default Node;
