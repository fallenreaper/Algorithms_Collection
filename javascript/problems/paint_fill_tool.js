//Paint fill.
//  Given an array of colors, a point, and a new Color, create a system which will change all colors adjacent to
//  Similar to Photshop Fill tool
class Point{ 
    constructor(x,y, color) {
        if (!color) color = "ffffff"
        this.color = color;
        this.x = x;
        this.y = y;
        this.visited = false;
    }

    getColor() { return this.color; }
    setColor(color) { this.color = color; }
    isVisited() { return this.visited; }
    setVisited() { this.visited = true; }
}

class Image {
    constructor( image ){
        this.grid = image;
    }

    static createImage(x,y){
        let grid = []
        for (let i = 0; i < x; i ++) {
            let row = [];
            for(let j = 0; j < y; j ++){
                row.push(new Point(i,j))
            }
            grid.push(row);
        }
        return new Image(grid);
    }

    prettyPrint() {
        let str = "";
        for (let i = 0; i < this.grid.length; i++){
            let row = []
            for(let j = 0; j < this.grid[i].length; j++){
                row.push (this.grid[i][j].getColor())
            }
            str += row.join("|") + "\n";
        }
        return str;
    }

    getPoint(x,y) {
        if (x < 0 || x > this.grid.length -1) return;
        if (y < 0 || y > this.grid[x].length -1) return;

        return this.grid[x][y];
    }

    fill(point, newColor){
        let pt = this.getPoint(point.x, point.y);
        if (!pt) return;
        let oldColor = pt.getColor();
        pt.setColor(newColor);

        pt.setVisited();
        let neighbors = this.getAdjacentNonVisitedPoints(pt);
        while (neighbors.length > 0) {
            pt = neighbors.shift();
            if (pt.getColor() == oldColor){
                pt.setVisited();
                pt.setColor(newColor);
                appendArray(neighbors, this.getAdjacentNonVisitedPoints(pt));
            }
        }
    }

    getAdjacentNonVisitedPoints(point) {
        let points = [];
        for (let i = point.x-1; i <= point.x +1; i++){
            if (i < 0 || i >= this.grid.length) continue;
            for(let j = point.y -1; j <= point.y +1; j++){

                if (j < 0 || j >= this.grid[i].length) continue;
                if (i == point.x && j == point.y) continue;
                let pt = this.getPoint(i,j);
                if (!pt) continue;
                if (!pt.isVisited()) points.push(pt);
            }
        }
        console.log("End");
        return points;
    }
}

function appendArray(arrA, arrB) {
    for (item of arrB){ 
        arrA.push(item);
    }
}

function main(){
    let image = Image.createImage(10,10);
    console.log(image.prettyPrint());
    image.fill(new Point(3,3), "aaaaaa");
    console.log(image.prettyPrint());
}
main();