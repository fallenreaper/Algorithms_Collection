// Heap

class Heap {
    constructor(list, direction){
        if (direction === undefined){
            direction = Heap.MIN;
        }
        if (direction != Heap.MIN && direction != Heap.MAX){
            return null;
        }
        this._managedData = list.slice();
        this._direction = direction;
        this.rebalance();
    }
    getLength() { return this._managedData.length; }
    getArray () { return this._managedData; }
    validate() {
        for (let i = 0; i < this.getLength() -1; i++){
            let leftIdx = 2 * i;
            let rightIdx = 2 * i + 1;
            let outString = " Current: " + this._managedData[i] 
            if (leftIdx < this.getLength()){
                outString += "-- Left: " + this._managedData[leftIdx];
                if (this._direction == Heap.MIN && this._managedData[i] > this._managedData[leftIdx]){
                    console.log("Invalid State.")
                    return false;
                }
            }
            if (rightIdx < this.getLength()){
                outString += "-- Right: " + this._managedData[rightIdx];
                if (this._direction == Heap.MAX && this._managedData[i] < this._managedData[leftIdx]){
                    console.log("Invalid State.")
                    return false;
                }
            }
            console.log(outString);
        }
        return true;
    }
    insert(value){
        this._managedData.push(value);
        this.rebalance();
    }
    pop(){
        if (this.getLength() == 0) return null;
        let returnValue = this._managedData[0];
        let popValue = this._managedData.pop();
        if (this.getLength() == 0) return returnValue
        this._managedData[0] = popValue;
        this.rebalance();
        return returnValue;
    }

    rebalance(){
        // 2n, 2n+1
        /*
        n -> (2n, 2n+1)
        */
       console.log("Start of Rebalance");
       console.log(this._managedData);
        for (var i = this._managedData.length - 1; i >= 0; i--){
            let parentIdx = Math.floor(i / 2);
            if (this._direction == Heap.MIN && this._managedData[parentIdx] > this._managedData[i]){
                let tmp = this._managedData[i];
                this._managedData[i] = this._managedData[parentIdx];
                this._managedData[parentIdx] = tmp;
            }else if(this._direction == Heap.MAX && this._managedData[parentIdx] < this._managedData[i]){
                let tmp = this._managedData[i];
                this._managedData[i] = this._managedData[parentIdx];
                this._managedData[parentIdx] = tmp;
            }
        }

        console.log("End of Rebalance");
        console.log(this._managedData);
    }
}
Heap.MIN = 0;
Heap.MAX = 1;

class MinHeap extends Heap {
    constructor(list){
        super(list, Heap.MIN);
    }
}

class MaxHeap extends Heap {
    constructor(list){
        super(list, Heap.MAX)
    }
}

class HeapSort {
    constructor(array, type){
        if (type === undefined) type = Heap.MIN;
        if (type != Heap.MIN && type != Heap.MAX) return null;
        let heap = new Heap(array, type);
        let returnArray = [];
        while ( heap.getLength() != 0 ){
            returnArray.push(heap.pop());
        }
        return returnArray
    }
}

function tests(){ 
    let list = new Array(20)
    for (let i = 0; i < 20; i++){
        list[i] = Math.floor(Math.random() * 100 + 1);
    }
    let heap = new Heap(list);
    console.log("Heap Test / MinHeap Test")
    console.log("----------------")
    console.log(list)
    console.log(heap.getArray());
    console.log("Is Heap Valid: " + heap.validate())
    console.log("----------------");

    let maxHeap = new Heap(list, Heap.MAX);
    console.log("Max Heap Test")
    console.log("----------------")
    console.log(list)
    console.log(maxHeap.getArray());
    console.log("Is Heap Valid: " + maxHeap.validate())
    console.log("----------------");

    let heapSort = new HeapSort(list);
    console.log("HeapSort Test")
    console.log("----------------")
    console.log("PreSorted Array: ", list)
    console.log("Sorted Array: ", heapSort);
    console.log("----------------");

}
function main(){ 
    tests();
}
main()