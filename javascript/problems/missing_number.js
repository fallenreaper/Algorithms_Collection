/*
An array A contains all the integers from 0 to N, except for 1 number which is missing.
In this problem, we cannot access an entire integer in A with a single operation.
The Elements of A are represented by BINARY, and the only operation we can use to access them is "fetch the jth bit of A[i]", which takes constant time.
Write code to find the missing integer.
Can you do it in O(n) time.
*/


/*
- There is no mention of order.
- All numbers in array exist will sum to: (arr[0] + arr[arr.length-1]) * arr.length/2
- - If it doesnt, the difference is the number missing.


 */
function solution(arr){
    //  Not fast, as N === bitstring length, m is array size so it would be o(n^2) as N is always at least the size of an item in the array
    let results = []
    for (let item of arr){
        // Item is instance of MyInt Class defined below.
        let binstr = "";
        for (let i = 0; i < item.length; i++){
            binstr = item.fetchJthBit(i) + binstr;
        }
        let numeric = parseInt(binstr, 2);
        results.push(numeric);
    }
    results.sort( (a,b) => a - b);
    console.log(`Sorted Array: ${results}`)
    //Normally this design is like (1+20)*(len/2) but it starts with 0, so you need to offset it below
    let augment = results[0] == 0 ? results[1] : results[0];
    let sizeItShouldBe = (augment + results[results.length -1]) * results.length / 2
    let actual = results.reduce((accumulation, current) => accumulation + current);
    let diff = sizeItShouldBe - actual;
    console.log(`${sizeItShouldBe} - ${actual} => ${diff}`);
    return diff;
}

function solution2(arr){
    // by looping through all the bits by column, determine what is missing.
    // keep walking by column until the answer presents itself.
    // Answer: TBD later this evening.

}

function main(){
    //set up test cases
    let arr = [];
    let size = 20
    for (let i = 0; i <= size; i++){
        // let item = new MyInt(size - 1 - i);
        if (i == 4) continue;
        arr.push(new MyInt(size - i));
    }
    let result = solution(arr);
    console.log(`Missing Number: ${result}`)
}

//class represeting the ability to fetch By BitAlone.
class MyInt {
    constructor(value){
        if (value == null || value === undefined) return null;
        this._binary = value.toString(2).padStart(Number.MAX_VALUE.toString(2).length, '0');
    }
    fetchJthBit(j){
        if (j < 0 || j > this._binary.length -1) return null;
        return this._binary[this._binary.length - j - 1]
    }

    get length () { return this._binary.length; }

    cheat() { return parseInt(this._binary, 2)}
}




main();