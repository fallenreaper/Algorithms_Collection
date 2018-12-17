function solve5p1(n, m, j, i){
    // Write a method to insert M into N such that M starts at bit J and ends at bit I.
    // Knowns: j - i < m.length.
    // merge m into n, starting at bit j, ending at bit i
    if (n == null || n == undefined || m == null || m == undefined) return;
    if (typeof n == "string") n = parseInt(n, 2);
    if (typeof m == "string") m = parseInt(m, 2);
    if (!_validate5p1(n,m,j,i)) return;
    let nBits = (n >> 0).toString(2);
    let mBits = (m >> 0).toString(2);
    //create a mask.  10000000000  10011
    let mask = 0;
    for (let idx = 0; idx < j - i; idx++){
        mask = mask << 1 | 1;
    }
    for (let idx = 0; idx < i; idx++){
        mask = mask << 1 | 0;
    }
    mask = ~mask;
    console.log(`Mask: ${(mask>>0).toString(2)}\nM: ${(m << (j - mBits.length + 1)).toString(2)}\nClear Mask: ${(n & mask).toString(2)}`)
    return (n & mask) | ( m << (j - mBits.length + 1) )
}
function _validate5p1(n,m,j,i){
    if (n == null || n == undefined) return false;
    if (m == null || m == undefined) return false;
    if (j == null || j == undefined || i == null || i == undefined) return false;
    if ((n>>0).toString(2).length < (m>>0).toString(2).length) return false;
    if (typeof n != "number" || typeof m != "number") return false;
    if (j < i) return false;
    return true;
}

function solve5p3(num){ // o(n^2) NAIVE
    // Flip bit to Win. Given a number, flip 1 bit from 0 to 1 to find the longest sequence of 1s
    if (num <= 0) return;
    let bitString = (num >> 0).toString(2)//.map( item => item == "1" ? 1 : 0);
    let max = 0;
    for (let i = 0; i < bitString.length; i++){
        let str = bitString.slice();
        str[i] = 1;
        let count = _maxNumberOfOnes(str);
        if (count > max) max = count;
    }
}

function solve5p3ADV(num){ // o(n + m) where m < n/2
    if (num <= 0) return;
    let bitString = (num >> 0).toString(2);
    let list = []
    count = 0;
    for (let i = 0; i < bitString.length; i++) {
        let row = bitString[i]
        if (row == "0"){
            list.push(count);
            count = 0;
        }else if (row == "1"){
            count++;
        }
        if (i == bitString.length -1){ list.push(count); }
    }
    console.log("Solve Iteration List: ", list)
    max = 1;
    for (let i = 0; i < list.length; i++){
        let row = list[i] + 1;
        if ( (i + 1) < list.length) {
            row += list[i + 1]
        }
        if (row > max) max = row;
    }
    return max;
}

function _maxNumberOfOnes(str) { // o(n)
    let count = 0;
    let max = 0;
    for( let i = 0; i < str.length; i++) {
        let row = str[i];
        if (row == "1") {
            count ++;
        }else if (row == "0"){
            if (count > max) max = count;
            count = 0;
        }
    }
    return max;
}

function solve5p7(num){
    //pairwise swap.  Swap odd and even bits with eachother with fewest instructions.
    let bits = (num >> 0).toString(2).split("");
    for (let i = 0; i < bits.length / 2; i++){
        let tmp = bits[2 * i];
        bits[2 * i] = bits[2 * i + 1];
        bits[2 * i + 1] = tmp;
    }
    console.log(`Start: ${(num >> 0).toString(2)}, End: ${bits.join("")}`)
    return parseInt(bits.join(""), 2)
}

function main(){
    let test = solve5p1("10000000000", "10011", 6, 2)
    console.log("Result: ", (test >> 0).toString(2));
    console.log("---------")
    let test2 = solve5p1("01111111111", "01100", 6, 1)
    console.log("Result2: ", (test2 >> 0).toString(2));

    console.log(`Str: ${(127>>0).toString(2)}, Max: ${solve5p3ADV(127)}`)
    console.log(`Str: ${(16>>0).toString(2)}, Max: ${solve5p3ADV(16)}`)
    console.log(`Str: ${(15>>0).toString(2)}, Max: ${solve5p3ADV(15)}`)
    console.log(`Str: ${(4>>0).toString(2)}, Max: ${solve5p3ADV(4)}`)

    console.log("-------------")
    console.log(`Result(37): ${solve5p7(37)}`)

}
main()