const Node = (props) => {
  return (
    <div
      className={`node 
        ${props.variant === "start" ? "node-start" : ""} 
        ${props.variant === "end" ? "node-end" : ""}`}
    ></div>
  );
};

export default Node;
