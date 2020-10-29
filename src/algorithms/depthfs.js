export function depthFirstSearch(grid, startNode, endNode) {
    const stack = []
    const visitedNodesInOrder = []

    stack.push(startNode)

    while(stack.length > 0) {

        let current = stack.pop()

        if(current === endNode) {
            return visitedNodesInOrder
        }

        if(!current.visited) {
            current.visited = true;
            visitedNodesInOrder.push(current)
        }

        let neighbors = getNeighbors(current, grid)

        for(let i = 0; i < neighbors.length; i++) {
            if(neighbors[i].isWall) continue
            neighbors[i].previous = current
            stack.push(neighbors[i])
        }

    }
    return visitedNodesInOrder
}

function getNeighbors(node, grid) {
    const neighbors = []
    const { col, row } = node
    if(row > 0) neighbors.push(grid[row - 1][col])
    if(row < grid.length - 1) neighbors.push(grid[row + 1][col])
    if(col > 0) neighbors.push(grid[row][col - 1])
    if(col < grid[0].length - 1) neighbors.push(grid[row][col + 1])
    return neighbors.filter(neighbor => !neighbor.visited)
}