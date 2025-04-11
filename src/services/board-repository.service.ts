export class BoardRepositoryService{
    private board: number[][] = Array.from({ length: 9 }, (_, i) => Array.from({ length: 9 }, (_, j) => 0));
    private initialBoard: number[][] = Array.from({ length: 9 }, (_, i) => Array.from({ length: 9 }, (_, j) => 0));

    constructor() {
        console.log("BoardRepositoryService initialized");
    }

    getBoard(): number[][] {
        return this.board;
    }

    setBoard(board: number[][]): void {
        this.board = board;
        this.initialBoard = board.map(row => [...row]);
    }

    getInitialBoard(): number[][] {
        return this.initialBoard;
    }

    clearBoard(): void {
        this.board = [];
        this.initialBoard = [];
    }
}