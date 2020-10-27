const Node = (props) => {
  return (
    <div
      className={`node 
        ${props.node.isStart ? "node-start" : ""} 
        ${props.node.isEnd ? "node-end" : ""}
        ${props.node.visited ? "node-visited" : ""}`}
    ></div>
  );
};

export default Node;
