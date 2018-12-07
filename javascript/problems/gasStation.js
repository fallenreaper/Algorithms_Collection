// N gas stations along a circular route.
// gas[i] is the amount of gas available.
// cost[i] the cost to get from cost[i] to cost[i+1]
// Find the min index to start at to make 1 full loop.
// note: car holds unlimited fuel.

// Implementation details.  While there is some pruning to optimize, it is generally a O(n!) runtime.
//   it doesnt need all answers, just the earliest index which satifsies the problem.  So it wont do anything thereafter.
//   On the start, if the current gas stations fuel cant even get to the next, it returns a no-go.

function solution(gas, cost){
    for (let i = 0; i < gas.length; i++){
        if (gas[i] < cost[i]) continue;
        let isCompleted = startPath(gas, cost, i)
        if (isCompleted) return i;
    }
    return -1;
}
function startPath(gas, costs, i){
    //results bool
    let currentFuel = 0;
    let start = i;// == 0 ? gas.length -1 : i - 1 ;
    let looped = false;

    for (let idx = i;; idx++){
        looped = looped || ( idx == (gas.length) );
        idx = idx % gas.length;
        if (idx == i && looped) break
        currentFuel += gas[idx] - costs[idx];
        console.log(`Station: (${idx}), Added ${gas[idx]}, Spent: ${costs[idx]}, Current Fuel: ${currentFuel}`)
        if (currentFuel < 0) return false;
    }
    return true;
}

function main(){
    test();
}

function test(){
    let base=[2,1], c = [1,2];
    console.log("Test Case: ", solution(base,c));
    base = [1,2], c = [2,1]
    console.log("Test Case 2:" , solution(base,c));

    var gasStations = [], costs = [];
    for( let i = 0; i < 10; i ++){
        gasStations.push(Math.floor(Math.random() * 6));
        costs.push(Math.floor(Math.random() * 6));
    }
    console.log("Gas:", gasStations, "Costs:", costs);
    let result = solution(gasStations, costs);
    console.log("10 Destinations: ", result)

    gasStations = [], costs = [];
    for( let i = 0; i < 100; i ++){
        gasStations.push(Math.floor(Math.random() * 6));
        costs.push(Math.floor(Math.random() * 6));
    }
    console.log("Gas:", gasStations, "Costs:", costs);
    result = solution(gasStations, costs);
    console.log("100 Destinations: ", result)
}

main()