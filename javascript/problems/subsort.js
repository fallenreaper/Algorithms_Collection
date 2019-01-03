// Given an array of ints, write a method to find indices m and n such that if you sorted elements m through n, the entire array would be sorted.
// Minimize n - m (that is, find the smallest such sequence)

function subSort(arr){
    //computation: O(n*log(n)) || O(n^2) depending on browser implementation
    //space: n
    let copy = arr.slice();
    copy.sort( (a,b)=> a-b );
    let m = n = null;
    for (let i =0 ; i < arr.length/2; i++){
        if (arr[i] != copy[i]) m = i;
        if (arr[arr.length - 1 -i] != copy[arr.length - 1 -i]) n = arr.length -1 -i;
        if (m && n) break;
    }
    return [m,n]
}

function subSort2(arr){
    // Computation: O((n^2)/2)
    // space: constant.
    let m = n = null;
    let previous = null
    for (let i = 1; i < arr.length/2; i++){
        previous = i -1
        if (arr[i] < arr[previous]){
            let current = arr[i];
            let tmp = i - 1;
            while (current < arr[tmp]){
                tmp--;
            }
            m = tmp;
        }
        let next = arr.length -i
        if (arr[arr.length -1 - i] > arr[next]){
            let current = arr[arr.length -1 -i];
            let tmp = arr.length -i
            while (current > arr[tmp]){
                tmp++;
            }
            n = tmp-1;
        }
        if (m && n) break;
    }
    return [m,n]
}

function main(){
    //Conclusion:  subsort being better is browser dependant.
    //             Assuming worst sorts used, SubSort2 would better.
    let arr = [1,2,4,7,10,11,7,12,6,7,16,18,19]
    console.log(`Test 1: [${subSort(arr)}]`)

    console.log(`Test 2: [${subSort2(arr)}]`)

}
main()