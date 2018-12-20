// Minesweeper
class Game {
    constructor(boardSize, bombCount){
        this.setup(boardSize, bombCount);
    }

    setup(boardSize, bombCount){
        if (!boardSize || !bombCount) return;
        this.time = Date.now();
        this.player = "Player 1";
        this.score = 0;
        this.boardSize = boardSize
        this.board = [];
        for (let i = 0; i < boardSize; i++){
            let row = [];
            for (let j = 0; j < boardSize; j++){
                row.push(new Space());
            }
            this.board.push(row);
        }
        this.bombs = bombCount;
        this._randomizeBombs();
    }
    _randomizeBombs(){
        let i = 0;
        while (i < this.bombs){
            let x = Math.floor(Math.random() * this.boardSize);
            let y = Math.floor(Math.random() * this.boardSize);
            let node = this.board[x][y];
            if (!node.isBomb()){
                i += 1;
                node.setBomb();
            }
        }
    }
    prettyPrint() {
        let result = "GAME BOARD\n----------\n";
        for (let i = 0; i < this.boardSize; i++){
            for (let j = 0; j < this.boardSize; j++){
                let cell = this.board[i][j];
                if (!cell.visited) {
                    result += "?";
                }else if (cell.isBomb()){
                    result += "X";
                }else if (cell.adjacentBombs == 0){
                    result += " "
                }else {
                    result += cell.adjacentBombs;
                }
            }
            result += "\n";
        }
        console.log(result);
        return result;
    }
    turn(){
        //Implement Turn Mechanism.
    }
    validateNode(x,y){
        if (x<0 || x>this.boardSize) return null;
        if (y<0 || y>this.boardSize) return null;
        let node = this.board[x][y];
        if (node.visited) return null;
        if (node.isBomb()) return -1

        this._checkAdjacent(x,y);
        if (this.board[x][y].adjacentBombs == 0) {
            this._flipAdjacent(x,y);
        }
    }

    _flipAdjacent(x,y){
        if (x<0 || x>this.boardSize -1) return null;
        if (y<0 || y>this.boardSize -1) return null;

        for (let i = x-1; i<= x+1; i++){
            for (let j = y - 1; j <= y+1; j++){
                if (i == x && j == y) continue;
                if (i < 0 || i > this.boardSize-1 || j < 0 || j > this.boardSize-1) continue;
                if (this.board[i][j].visited) continue;
                this._checkAdjacent(i,j);
                if (this.board[i][j].adjacentBombs == 0) this._flipAdjacent(i,j);
            }
        }
    }

    _checkAdjacent(x,y) {
        if (x<0 || x>this.boardSize -1) return null;
        if (y<0 || y>this.boardSize -1) return null;
        let bombCount = 0;
        for (let i = x-1; i<= x+1; i++){
            for (let j = y - 1; j <= y+1; j++){
                if (i == x && j == y) continue;
                if (i < 0 || i > this.boardSize-1 || j < 0 || j > this.boardSize-1) continue;
                if (this.board[i][j].isBomb()){
                    bombCount++;
                }
            }
        }
        this.board[x][y].visited = true;
        this.board[x][y].adjacentBombs = bombCount;
        return bombCount;
    }
}

class Space {
    constructor(){
        this.containsBomb = false
        this.adjacentBombs = 0;
        this.visited = false;
    }
    clearBomb() { this.containsBomb = false;}
    setBomb() {this.containsBomb = true;}
    isBomb() { return this.containsBomb}
}





function main(){
    let game = new Game(10,15);
    game.validateNode(0,0);
    game.prettyPrint();


}
main();