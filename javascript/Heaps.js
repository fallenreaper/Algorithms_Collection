// Heap

class Heap {
    constructor(list, direction){
        if (direction === undefined){
            direction = Heap.MIN;
        }
        if (direction != Heap.MIN && direction != Heap.MAX){
            return null;
        }
        this._length = list.length; 
        this._managedData = list.slice();
        this._direction = direction;
        this.rebalance();
    }
    print () { return this._managedData; }
    test() {
        for (let i = 0; i < this._managedData -1; i++){
            let leftIdx = 2 * i;
            let rightIdx = 2 * i + 1;
            let outString = " Current: " + this._managedData[i] 
            if (leftIdx < this._length){
                outString += "-- Left: " + this._managedData[leftIdx];
                if (this._direction == Heap.MIN && this._managedData[i] > this._managedData[leftIdx]){
                    console.log("Invalid State.")
                    return false;
                }
            }
            if (rightIdx < this._length){
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
    insert(value){}
    pop(){}

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
        super(list);
    }
}

class MaxHeap extends Heap {
    constructor(list){
        super(list)
    }
}

class HeapSort {
    constructor(array){}
}

class Node {
    constructor(value, pointers){
        this.value = value || null;
        this.parent = pointers["parent"] || null;
        this.left = pointers["left"] || null;
        this.right = pointers["right"] || null;
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
    console.log(heap.print());
    console.log("Is Heap Valid: " + heap.test())
    console.log("----------------");

    let maxHeap = new Heap(list, Heap.MAX);
    console.log("Max Heap Test")
    console.log("----------------")
    console.log(list)
    console.log(maxHeap.print());
    console.log("Is Heap Valid: " + maxHeap.test())
    console.log("----------------");

}
function main(){ 
    tests();
}
main()