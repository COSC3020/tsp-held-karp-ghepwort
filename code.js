function tsp_hk(distance_matrix) {
    let shortestPath = Infinity;

    // Try each city as the starting point
    for (let startCity = 0; startCity < distance_matrix.length; startCity++) {
        let visitedCities = new Set([startCity]);
        let pathLength = findShortestPath(distance_matrix, startCity, visitedCities);
        if (pathLength < shortestPath) {
            shortestPath = pathLength;
        }
    }

    // If no valid path was found, return 0
    if (shortestPath === Infinity) {
        return 0;
    }

    return shortestPath;
}

function findShortestPath(matrix, currentCity, visitedCities, memoization = {}) {
    // Create a unique key for memoization based on the current city and visited cities
    // Manually build the visited cities string

    // I had to convert from a set to an array since a set doesn't have the .join() function weirdly enough
    // Sort the nodes first before using them in the key
    visitedString = Array.from(visitedCities).sort((city1, city2) => city1 - city2).join(",");


    // Manually build the key string
    let key = currentCity + '|' + visitedString;



    // Return the memoized value if available
    if (memoization[key] !== undefined) {
        return memoization[key];
    }

    // Base case: if all cities are visited, return to the starting city (no more cost)
    if (visitedCities.size === matrix.length) {
        return 0;
    }

    let minPathLength = Infinity;

    // Explore each unvisited city
    for (let nextCity = 0; nextCity < matrix.length; nextCity++) {
        if (!visitedCities.has(nextCity) && matrix[currentCity][nextCity] !== 0) {
            visitedCities.add(nextCity);
            let pathLength = matrix[currentCity][nextCity] + findShortestPath(matrix, nextCity, visitedCities, memoization);
            minPathLength = Math.min(minPathLength, pathLength);
            visitedCities.delete(nextCity); // Backtrack
        }
    }

    // Memoize the result for the current state
    memoization[key] = minPathLength;
    return minPathLength;
}