import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class BoardRepositoryService {
    private board: number[][] = Array.from({ length: 9 }, (_, i) => Array.from({ length: 9 }, (_, j) => 0));
    private initialBoard: number[][] = Array.from({ length: 9 }, (_, i) => Array.from({ length: 9 }, (_, j) => 0));
    private fixedCells: boolean[][] = Array.from({ length: 9 }, (_, i) => Array.from({ length: 9 }, (_, j) => false));
    constructor() {
        console.log("BoardRepositoryService initialized");
    }

    getBoard(): number[][] {
        return this.board;
    }

    setBoard(board: number[][]): void {
        this.board = board;
        if (this.initialBoard.length === 0) {
            this.initialBoard = board.map(row => [...row]);
            this.fixedCells = board.map(row => row.map(cell => cell !== 0));
        }
    }

    getInitialBoard(): number[][] {
        return this.initialBoard;
    }

    clearBoard(): void {
        this.board = [];
        this.initialBoard = [];
        this.fixedCells = [];
    }
}