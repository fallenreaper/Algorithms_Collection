// Write a method to randomly generate a set of m integers from an array of size n.
// Each element must have equal probability of being chosen.

function randomSetSolution(m, arr){
    // O(2n) => O(n)
    // Space Complex: m
    let result = [];
    for (let i = 0; i < m; i++){
        result.push(arr[i]);
    }
    for (let i = m; i < arr.length; i++){
        let idx = Math.floor(Math.random() * i)
        if (idx < m) result[idx] = arr[i];
    }
    return result;
}

function main(){
    let somearray = [];
    for (let i = 0; i < 20; i ++){
        somearray.push(Math.floor(Math.random() * 100 + 1));
    }
    let m = 11;
    let result = randomSetSolution(m, somearray);
    console.log(`Randomized Results: ${result}`);
}
main()

