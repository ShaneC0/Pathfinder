export function dijkstra(grid, startNode, endNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  let unvisitedNodes = deepCopy(grid);
  while (unvisitedNodes) {

    sortByDistance(unvisitedNodes);

    const closestNode = unvisitedNodes.shift();

    closestNode.visited = true;

    visitedNodesInOrder.push(closestNode);

    if (closestNode === endNode) return visitedNodesInOrder;

    updateUnvisitedNeighbors(closestNode, grid);

  }

  return undefined;
}

function sortByDistance(nodes) {
  nodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function deepCopy(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  if(!unvisitedNeighbors) return null
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previous = node;
  } 
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  let unvisited = neighbors.filter((neighbor) => !neighbor.visited);
  return unvisited.filter(node => !node.isWall)
}
