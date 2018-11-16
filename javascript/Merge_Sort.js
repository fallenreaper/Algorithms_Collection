

class MergeSort {
    constructor(list){
        this.list = list;
        this.tempArray = new Array(this.list.length);
        this.sort(0, this.list.length - 1)
        return this.list;
    }

    sort(lowerIdx, upperIdx){
        if (lowerIdx < upperIdx){
            let centerIdx = Math.floor((upperIdx - lowerIdx) / 2) + lowerIdx;
            this.sort(lowerIdx, centerIdx);
            this.sort(centerIdx + 1, upperIdx);
            console.log("Sort: ", lowerIdx, centerIdx, upperIdx)
            this.merge(lowerIdx, centerIdx, upperIdx);
        }
    }
    merge(lowerIdx, centerIdx, upperIdx){
        for (let i = lowerIdx; i <= upperIdx; i++){
            this.tempArray[i] = this.list[i];
        }
        console.log("Temp Array: ", this.tempArray);
        let i = lowerIdx, j = centerIdx + 1, k = lowerIdx;
        while ( i <= centerIdx && j <= upperIdx) {
            if ( this.tempArray[i] <= this.tempArray[j] ) {
                this.list[k] = this.tempArray[i]
                i ++;
            } else {
                this.list[k] = this.tempArray[j]
                j ++;
            }
            k++;
        }
        
        while ( i <= centerIdx ) {
            this.list[k] = this.tempArray[i];
            i ++;
            k ++;
        }
        
    }
}



function main(){
    let array = [];
    for (let i = 0; i < 10; i ++) {
        array.push(Math.floor(Math.random() * 100 + 1))
    }
    console.log(array);
    console.log("Results: ", new MergeSort(array))
}
main();