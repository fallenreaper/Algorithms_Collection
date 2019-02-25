// You have an array of heights, denoting a landscape.
// You want to find the area of all the puddles creates in the array.
/*

    x
x   x
x x x
x xxx

array = [3, 0, 2, 1, 4]
the resting puddlees would be the diff between the the 2 tallest items
The answer for this sample would be 6
*/

function solve(arr){
    let tallest = ( arr, idx, dir ) => {
        let max = null;
        for (let i = dir ? idx + 1 : idx -1; dir ? i < arr.length : i >= 0; dir ? i++ : i--){
            let row = arr[i];
            if (max == null || row > max) max = row
        }
        return max;
    }
    let vol = [];
    for (let i = 0; i < arr.length; i++){
        let right = tallest(arr, i, true);
        let left = tallest(arr, i, false);
        let lowest = right < left ? right : left;
        lowest -= arr[i];
        lowest = lowest < 0 ? 0 : lowest;
        vol.push(lowest);
    }
    console.log("Result: ", vol);
    return vol.reduce((previous, current) => previous + current);
}

function main() {
    console.log(solve([3,0,2,1,4]))
    console.log(solve([0,1,2,1,0]))
}
main()

