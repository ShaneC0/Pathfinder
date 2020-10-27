import Node from './Node';

const Grid = (props) => {
    return (
        <div>
            {props.nodes.map(node => <Node variant={node.variant} />)}
        </div>
    )
}


export default Grid;