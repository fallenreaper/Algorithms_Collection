// Bucket Sort sort in Javascript
//Radix Sort in Javascript.
class StringBucketSort {
    // This is a Bucket Sort, sorting on strings 0-255.  
    // It can be narrowed to 0-9a-zA-Z most likely
    // This could be optimized also by making all strings upper cased.
    // O(n^2) runtime
    // O(nk) space.
    constructor(array){
        return this.sort(array, 255);
    }

    msbits(value, idx) {
        if (!value[idx]){
            return null;
        }
        return value[idx].charCodeAt(0);
    }

    sort(array, numberOfBuckets){
        let buckets = [];
        for (let i = 0; i < numberOfBuckets; i++){
            buckets.push([]);
        }

        for (let i = 0; i < array.length; i++){
            let value = array[i];
            let mostsignificantbits = this.msbits(value, 0);
            if (mostsignificantbits == null){
                console.log("Error");
                return;
            }
            console.log("BIT", mostsignificantbits);
            buckets[mostsignificantbits].push(value);
        }

        for (let i = 0; i < numberOfBuckets; i++){
            buckets[i] = this.sortBucket(buckets[i])
            console.log(buckets[i]);
        }

        let result = [];
        for (let i = 0; i < numberOfBuckets; i++){
            for (let j = 0; j < buckets[i].length; j++){
                result.push(buckets[i][j]);
            }
        }
        return result;
    }

    sortBucket (bucket) {
        bucket.sort(function(a,b){ return a > b;});
        return bucket;
    }
}

class RadixSort {
    // O(wn) runtime.
    // O(w+n) memory
    // Required for sorting of numbers or an numeric key..
    constructor(array, base){
        if (base === undefined){
            //base we want as an optional param.
            base = 10;
        }
        //check that array is actually an array.
        if (! array instanceof Array){
            console.log("Array param is not an Array.");
            return -1;
        }

        let maxValue = null;
        array.forEach( (num) => {
            if (maxValue == null || num > maxValue){
                maxValue = num;
            }
        });
        let i = 0;
        while( Math.pow(base, i) <= maxValue){
            array = this.bucketToList(this.listToBucket(array, base, i));
            i++;
        }
        return array;
    }

    bucketToList(buckets){
        var numbers = [];
        buckets.forEach( (bucket) => {
            bucket.forEach( (number) => {
                numbers.push(number);
            })
        });
        return numbers;
    }
    listToBucket(array, base, iterator){
        var buckets = [];
        for (var i = 0; i < base; i++){
            buckets.push([]);
        }
        array.forEach( (item) => {
            var digit = ( Math.floor( item / Math.pow(base, iterator)) ) % base;
            if (buckets[digit] == null){
                buckets[digit] = [];
            }
            buckets[digit].push(item);
        })
        return buckets
    }
}

var testRadixSort = function (){
    var testArray = [];
    for (let i = 0; i < 100; i++){
        testArray.push(Math.floor(Math.random() * 100 + 1));
    }
    console.log("Test Begining for Array length: ", testArray.length);

    console.log("Results: ", new RadixSort(testArray));

    console.log("Testing Complete");
}

var testStringBucketSort = function(){
    let testArray = [];
    for (let i = 0; i < 100; i++){
        str = ""
        for (let j = 0; j < 10; j++){
            str += String.fromCharCode(Math.random() * 26 + 65);
        }
        testArray.push(str);
    }
    console.log("Test Begining for array length: ", testArray.length)
    console.log("Sorting: ", new StringBucketSort(testArray));
    console.log("Test Complete.");
}

var mainTestThread = function(){
    console.log("Testing String Bucket Sort");
    testStringBucketSort();
    console.log("Testing Radix Sort");
    testRadixSort();
    console.log("Done.")
}
mainTestThread();
