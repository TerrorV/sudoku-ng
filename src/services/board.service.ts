import { Injectable } from "@angular/core";
import { BoardRepositoryService } from "./board-repository.service";
import { SudokuService } from "./sudoku.service";
import { CellData } from "./cell-data";

@Injectable({
    providedIn: 'root',
})
export class BoardService {
    private repository: BoardRepositoryService;
    private sudokuService: SudokuService;

    constructor(repository: BoardRepositoryService, sudokuService: SudokuService) {
        this.repository = repository;
        this.sudokuService = sudokuService;
        console.log("BoardService initialized");
    }

    getBoard(): CellData[][] {
        return this.repository.getBoard();
    }

    clearBoard(): void {
        this.repository.clearBoard();
    }

    async initBoard(difficulty: 'easy' | 'medium' | 'hard' | 'random'): Promise<void> {
        this.repository.clearBoard();
        let board = await this.sudokuService.getBoard(difficulty);
        this.repository.setBoard(board.board);
    }

    async validateBoard(): Promise<any> {
        const board = this.repository.getBoard();
        let result = await this.sudokuService.validateBoard(board.map(row => row.map(cell => cell.currentValue)));
        return result;
    }
}