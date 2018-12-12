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

function solution(matrix,x,y){
    if (x > matrix.length || y > matrix[0].length){
        // This denotes a range error on X or Y
        return -1;
    }
    let largest = null;
    //Goal is to create a map of rectangles greater than 1x1, then iterate over them to determine sizes.
    for (let i = x; i < matrix.length; i++){
        for (let j = y; j < matrix[i].length; j++){
            let cell = matrix[i][j];
            // You wont need to look at already visited cells, as they would have already been scanned.
            if (cell == 1){
                let result = findRectangle(matrix, i, j);
                if (result){
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

function isValidRectangle(matrix){
    for (let arr of matrix){
        for (let cell of arr){
            if (cell != 1) return false;
        }
    }
    return true;
}

function subMatrix (matrix, x, y, w, h) {
    let result = [];
    for (let i = x; i < x+w; i++){
        result.push(matrix[i].slice(y,h+1))
    }
    return result;
}
 

function main(){
    let matrix = [];
    for (let i = 0; i<3;i++){
        matrix.push([])
        for (let j = 0; j < 3; j++){
            matrix[i].push(Math.floor(Math.random() * 2))
        }
    }
    console.log("Sample Matrix: ", matrix);
    solution(matrix, 0, 0);
}

function compare(m1,m2){
    if (m1.length != m2.length) return false;
    for (let i = 0; i < m1.length; i++){
        if (m1[i].length != m1[i].length) return false;
        for (let j = 0; j < m1[i].length; j++){
            if (m1[i][j] != m2[i][j]) return false;
        }
    }
    return true;
}

function test(){
    let testMatrix = [[1,1,0],[1,1,0],[0,1,1]];
    console.log("Test 1:")
    console.log(testMatrix);
    solution(testMatrix, 0, 0);

    console.log("---------------------------\nTest 2:")
    testMatrix = [[0,1,1,1],[0,1,0,1],[0,1,0,1],[1,1,1,1]];
    console.log(testMatrix)
    solution(testMatrix, 0, 0)

    console.log("---------------------------\nTest 3:")
    testMatrix = [[0,1,1,1],[0,1,1,1],[0,1,1,1],[1,1,1,1]];
    console.log(testMatrix)
    solution(testMatrix, 0, 0)


    // let testMatrix = [[1,2,3],[4,5,6],[7,8,9]]
    // let testResult = subMatrix(testMatrix, 1, 1, 2, 2);
    // console.log("Testing subMatrix: ", testResult)
    // console.log("Is Valid: ", compare([[5,6],[8,9]], testResult))
}
test();
// main()