// Given a matrix of 1s and 0s, find the largest rectangle containly only 1s, and return its area.

class Rectangle{
    constructor(x1, y1, x2, y2){
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
    width() { return Math.abs(this.x2 - this.x1) + 1;}
    height() { return Math.abs(this.y2 - this.y1) + 1;}
    getArea() { return this.width() * this.height();}
    getPosition() { return {x:this.x1, y: this.y1}}
    toJson() { return {x1: this.x1, y1: this.y1, x2: this.x2, y2: this.y2}}
}

function solution(matrix){
    let largest = null;
    //Goal is to create a map of rectangles greater than 1x1, then iterate over them to determine sizes.
    for (let i = 0; i < matrix.length; i++){
        for (let j = 0; j < matrix[i].length; j++){
            let cell = matrix[i][j];
            // You wont need to look at already visited cells, as they would have already been scanned.
            if (cell == 1){
                let result = findRectangle(matrix, i, j);
                if (result){
                    i = result.x2;
                    j = result.y2;
                    if (!largest || largest < result){
                        largest = result;
                    }
                }
            }
        }
    }
    console.log("Largest Rect: ", largest, "Area: ", largest.getArea());
    return largest;
}

function findRectangle(matrix, x, y){
    let xEnd = x, yEnd = y;
    for (let i = x; i < matrix.length; i++){
        let cell = matrix[i][y];
        if (cell != 1 || i == matrix.length - 1){
            xEnd = i;
            break;
        }
    }
    for ( let i = y; i < matrix[x].length; i++){
        let cell = matrix[x][i];
        if (cell != 1 || i == matrix[x].length - 1){
            yEnd = i;
            break;
        }
    }

    rectOption = null;
    for (let i = x; i <= xEnd; i++){
        for( let j = y; j <= yEnd; j++){
            let r = new Rectangle(x, y, i, j);
            if (verifyRectangle(matrix, r)){
                if (!rectOption || rectOption.getArea() < r.getArea()){
                    rectOption = r;
                }
            }
        }
    }
    console.log("LARGEST: ", rectOption);
    return rectOption;
}

function verifyRectangle(matrix, rect) {
    for ( let i = rect.x1; i <= rect.x2; i++) {
        for (let j = rect.y1; j <= rect.y2; j++) {
            let cell = matrix[i][j];
            if (cell != 1) {
                console.log("FALSE")
                return false;
            }
        }
    }

    return true;
}

function main(){
    let matrix = [];
    for (let i = 0; i<30;i++){
        matrix.push([])
        for (let j = 0; j < 30; j++){
            matrix[i].push(Math.floor(Math.random() * 2))
        }
    }
    console.log("Sample Matrix: ", matrix);
    solution(matrix);
}

function test(){
    let testMatrix = [[1,1,0],[1,1,0],[0,1,1]];
    console.log("Test 1:");
    console.log(testMatrix);
    solution(testMatrix);

    console.log("---------------------------\nTest 2:");
    testMatrix = [[0,1,1,1],[0,1,0,1],[0,1,0,1],[1,1,1,1]];
    console.log(testMatrix);
    solution(testMatrix);

    console.log("---------------------------\nTest 3:");
    testMatrix = [[0,1,1,1],[0,1,1,1],[0,1,1,1],[1,1,1,1]];
    console.log(testMatrix);
    solution(testMatrix);
}
// test();
main()