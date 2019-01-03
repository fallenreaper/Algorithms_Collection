// write a function to swap a number in place

function swap(arr, a, b){
    arr[a] -= arr[b];
    arr[b] = arr[a] + arr[b];
    arr[a] = arr[b] - arr[a]
}

function main(){
    let arr = [26,3,14]
    //  12, 3, 12+14
    //  12+14-12, 3, 12 
    console.log(arr)
    swap(arr, 0, 2);
    console.log(arr)
}
main();