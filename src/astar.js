export const aStar = async (grid, startNode, endNode) => {
  let openSet = [];
  let closedSet = [];

  //push the start into the open set with distance of 0
  openSet.push(startNode);

  while (openSet.length > 0) {
    let currentNode = findLowestEstimatedDistance(openSet);

    if (currentNode === endNode) {
      const shortestPath = [];
      while (!endNode.isStart) {
        shortestPath.push(endNode);
        endNode = endNode.previous;
      }
      return shortestPath;
    }

    openSet = removeItem(openSet, currentNode);

    let neighbors = findNeighbors(grid, currentNode);

    for (let i = 0; i < neighbors.length; i++) {
      if (!closedSet.includes(neighbors[i])) {
        let tempCost = currentNode.costFromStart + 1;

        if (!openSet.includes(neighbors[i])) {
          neighbors[i].costFromStart = tempCost;
          neighbors[i].heuristic = heuristic(neighbors[i], endNode);
          neighbors[i].estimatedShortestPath =
            neighbors[i].costFromStart + neighbors[i].heuristic;
          neighbors[i].previous = currentNode;

          openSet.push(neighbors[i]);
        } else {
          if (tempCost < neighbors[i].costFromStart) {
            neighbors[i].costFromStart = tempCost;
          }
        }
      }
    }
    currentNode.visited = true;
  }
};

const heuristic = (node, end) => {
  let a = node.row - end.row;
  let b = node.col - end.col;
  return Math.sqrt(a * a + b * b);
};

const findNeighbors = (grid, node) => {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.visited);
};

const findLowestEstimatedDistance = (array) => {
  let optimalNode = array[0];
  for (let i = 0; i < array.length; i++) {
    if (array[i].estimatedShortestPath < optimalNode.estimatedShortestPath) {
      optimalNode = array[i];
    }
  }
  return optimalNode;
};

const removeItem = (array, item) => {
  return array.filter((obj) => obj !== item);
};
