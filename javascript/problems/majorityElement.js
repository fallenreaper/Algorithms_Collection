// given array of size end, find element which appears more than floor(n/2) times.

function solution(arr){
    flag = Math.floor(arr.length / 2) + 1;
    let m = {};
    for (let i = 0; i < arr.length; i++){
        let row = arr[i]
        if (!m[row]){
            // console.log("Setting ", row)
            m[row] = 1;
        }else {
            // console.log("++")
            m[row] ++;
        }
        // console.log("Map:", m)
        if (m[row] >= flag){
            // check to see if the current item means the minimum
            return row;
        }
    }
    console.log("M: ", m)
    var result = findKeyForLargestObjectValue(m);
    if (result >= flag) return result;
    return -1;
}

function findKeyForLargestObjectValue(m){
    let keys = Object.keys(m);
    if (keys.length == 0) return -1;
    console.log("Keys: ", keys)
    let highest = keys[0] ;
    for (let key of keys){
        if (m[key] > m[highest]) highest = key;
    }
    console.log("Highest: ", highest);
    return highest;
}

function main(){
    let testA = [1,1,3];
    console.log("TestA Result: ", solution(testA));

    let testB = [1,2,1];
    console.log("TestB Result: ", solution(testB));

    let arr = [];
    for (let i=0; i< 100; i++){
        arr.push(Math.floor(Math.random() * 10 + 1));
    }
    console.log("Result: ", solution(arr))
}

main();