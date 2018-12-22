// Find all permutations of a string, disgarding all duplicates.

// Goal walk through the array, for each item in the array temp remove it, 
//  and call the same function with the sub array
function recursion(str, prepend, resultSet){
    if (str.length == 1) return str[0];
    for (let i = 0; i < str.length; i++) {
        let current = str[i];
        let sub = removeIndexFromString(str, i);
        // sub is a string.
        resultSet.add(prepend + current + sub);
        recursion(sub, current, resultSet);
        

    }
}

function recurse(arr){
    
}

function appendArray( toArr, fromArr) {
    for (let i = 0; i < fromArr; i ++){
        toArr.push(fromArr[i]);
    }
    return toArr;
}

function removeIndexFromString(str, i){
    // console.log("STRING: ", str);
    let arr = str.split("");
    x = arr.slice();
    for(let j = i; j < x.length - 1; j++){
        x[j] = x[j+1];
    }
    x.pop();
    // console.log("RESULTS: " + x)
    return x.join("");
}

fib = arr => arr > 1 ? fib(arr-1) + fib(arr-2) : 1;
// 1 1 2 3 5 8 13
function iteratively(arr){

}

function main(){
    console.log(fib(5));
    //let str = "aaaaaaabcfafgggfgjasd";
    let str = "bag";
    // console.log("SPLIT: ", str.split(""));
    let set = new Set(str.split(""));
    let keys = []
    for (let row of set){
        keys.push(row);
    }
    console.log("KEYS:", keys);
    //abcdgis

    let results = new Set([]);
    // console.log("START: ", keys)
    recursion(keys.join(""), "", results);
    let arr = [];
    for (let row of results.values()){
        arr.push(row)
    }
    console.log("Results Recursion: ", arr);

    //iteratively(arr);
    
}
main();