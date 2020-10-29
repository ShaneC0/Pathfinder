export function aStar(grid, startNode, endNode) {
    let openSet = []
    let nodesInVisitedOrder = []

    startNode.g = 0
    startNode.f = hueristic(startNode, endNode)

    openSet.push(startNode)

    console.log(openSet)

    while(openSet.length > 0) {
        console.log('hello')
        let current = lowestF(openSet)

        if(current === endNode) {
            return nodesInVisitedOrder
        }

        openSet = openSet.filter(node => node !== current)
        nodesInVisitedOrder.push(current)

        let neighbors = findNeighbors(current, grid)

        for(let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i]

            let tempG = current.g + 1
            
            if(tempG < neighbor.g) {
                neighbor.previous = current
                neighbor.g = tempG
                neighbor.f = neighbor.g + hueristic(neighbor, endNode)
                if(!openSet.includes(neighbor)) {
                    openSet.push(neighbor)
                }
            }
        }
        current.visited = true
    }

}



function lowestF(array) {
    let lowestIndex = 0
    for(let i = 0; i < array.length; i++) {
        if(array[i].f < array[lowestIndex].f)
        lowestIndex = i
    }
    return array[lowestIndex]
}

function hueristic(node, end) {
    let x = end.col - node.col
    let y = end.row - node.row
    return Math.sqrt((x * x) + (y * y))
}

function findNeighbors(node, grid) {
    const neighbors = []
    const { col, row } = node
    if(row > 0) neighbors.push(grid[row - 1][col])
    if(row < grid.length - 1) neighbors.push(grid[row + 1][col])
    if(col > 0) neighbors.push(grid[row][col - 1])
    if(col < grid[0].length - 1) neighbors.push(grid[row][col + 1])
    return neighbors.filter(neighbor => !neighbor.visited)
}