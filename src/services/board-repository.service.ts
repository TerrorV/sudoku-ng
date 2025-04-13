import { Injectable } from "@angular/core";
import { CellData } from "./cell-data";

@Injectable({
    providedIn: 'root',
})
export class BoardRepositoryService {
    private board: CellData[][] = [];
    constructor() {
        console.log("BoardRepositoryService initialized");
    }

    getBoard(): CellData[][] {
        return this.board;
    }

    setBoard(board: number[][]): void {
        this.board = board.map(row => row.map(cell => new CellData(cell, cell, cell !== 0)));
    }

    getInitialBoard(): CellData[][] {
        return this.board;
    }

    clearBoard(): void {
        this.board = [];
    }
}