//given 2 arrays, find a pair which has the smallest difference which is non neg:
//Example: a=[1,3,15,11,2] b=[23,127,235,19,8]
//         Answer: [11,8]

function getSmallestDiff(arrA, arrB){
    let sortedB = arrB.sort((a,b) => a-b);
    let sortedA = arrA.sort((a,b) => a-b);
    console.log("A:", sortedA, "\nB: ", sortedB);

    let tuple = [];
    for (let i = 0; i < sortedA.length; i++){
        for(let j = 0; j < sortedB.length; j++){
            let v = sortedA[i] - sortedB[j]
            if (v < 0) break;
            if (    tuple.length > 0 && 
                    sortedB[j] < sortedB[tuple[2]] ) break;
            if (tuple.length == 0 && v >= 0){
                tuple = [v, i, j];
            } else if( v >= 0 && v < tuple[0]){
                tuple = [v, i, j];
            }
        }
    }
    return [sortedA[tuple[1]], sortedB[tuple[2]]]
}

function main(){
    let a = [1,3,15,11,2]
    let b = [23,127,235,19,8]
    console.log(getSmallestDiff(a,b))

    a = [6,7,8,9,10]
    b = [1,2,3,4,5]
    console.log(getSmallestDiff(a,b))
}
main()