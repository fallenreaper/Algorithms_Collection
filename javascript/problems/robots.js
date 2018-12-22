// ROBOTS

// You have a grid of space RxC.  You have a robot starting Top left.
// It can only move Down and Right.
// Some cells are not allowed to be crossed.
// Find a path from TOP LEFT to BOTTOM Right

class Grid {
    constructor(r,c, invalid_cells){
        if (r <= 0 || c<= 0) return;
        this.rows = r;
        this.columns = c;

        // Establishing Grid.
        this.grid = [];
        for (let i = 0; i < r; i++){
            let row = [];
            for (let j = 0; j < c; j++){
                row.push(new Cell(i,j));
            }
            this.grid.push(row);
        }

        // setting blocked fields
        for ( let idx of invalid_cells) {
            console.log(`INVALID CELL: ${idx}`);
            let row = idx[0];
            let col = idx[1];
            if (row < 0 || col < 0) continue;
            if (! this.grid[row]) continue;
            if (! this.grid[row][col]) continue;

            this.grid[row][col].setBlocked();
        }
    }

    getCell(x,y) {
        if (x < 0 || x > this.grid.length -1) return null;
        if (y < 0 || y > this.grid[x].length -1) return null;
        return this.grid[x][y]
    }

    isValidCell(x,y) { 
        return this.getCell(x,y) != null 
            && !this.getCell(x,y).blocked 
            && !this.getCell(x,y).visited; 
    }

    getAdjacentCells(x,y){
        // returns an array of [x,y]
        let results = [];
        for (let i = x -1; i <= x+1; i++){
            for(let j = y -1; j <= y+1; j++){
                if (i < 0 || i > this.grid.length -1) continue;
                if (j < 0 || j > this.grid[i].length -1) continue;
                results.push([i,j]);
            }
        }
        return results;
    }
}

class Cell {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.visited = false;
        this.blocked = false;
        this.wave = 0;
    }

    setBlocked(){ this.blocked = true; }
    wasVisited() { return this.visited; }
}

function solution(){
/*
    S0x00   0,2
    00000
    0xx0x   2,1 2,2 2,4
    000x0   3,3
    0x00E   4,1
    */
    // Remove [3,1] to have a success.
    let grid = new Grid(5,5,[[0,2], [2,1], [2,2], [2,4], [3,3], [4,1]]);
    let start = [0,0];
    let end = [4,4]
    let robot_path = [];
    robot_path.push([0,0]);

    // create a queue to do a Breadth first search of traversals to determine if there is a path
    //  from start to end.
    let found = false;
    while(true){
        console.log(`Robot Array: ${robot_path}`);
        // If you want to do DFS, use pop.
        let current = robot_path.shift();
        console.log(`Current Value of Current: ${current}`);
        if (!current) {
            console.log("FAILED TO FIND A PATH TO END");
            found = false;
            break;
        }
        if (current[0] == end[0] && current[1] == end[1]){
            console.log("FOUND A PATH TO END!")
            found = true;
            break;
        }
        cell = grid.getCell(current[0], current[1]);
        let current_wave = cell.wave + 1;
        if (!cell) {
            found = false;
            break;
        }
        if (cell.wasVisited()){
            continue;
        }

        if (grid.isValidCell(current[0]+1, current[1])){
            grid.getCell(current[0]+1, current[1]).wave = current_wave;
            robot_path.push([current[0]+1, current[1]]);
        }
        if (grid.isValidCell(current[0], current[1]+1)){
            grid.getCell(current[0], current[1]+1).wave = current_wave;
            robot_path.push([current[0], current[1]+1]);
        }
    }

    if (found){
        console.log( grid.grid.map(row => row.map( cell => cell.wave)));
        let path = [end];
        let current = end;
        
        while(true){
            let cell = grid.getCell(current[0], current[1]);
            if (!cell) break;
            if (cell.wave == 0) break;

            let adj = grid.getAdjacentCells(cell.x, cell.y);
            for (let row of adj){
                let c = grid.getCell(row[0], row[1]);
                if (!c) continue;
                if (c.wave == cell.wave -1){
                    path.push(row);
                    current = [c.x, c.y];
                    break;
                }
            }
        }
        path.reverse()
        return path;

    }else {
        return null;
    }
}

function main(){
    let result = solution();
    if (result){
        console.log(result);
    }
}
main()