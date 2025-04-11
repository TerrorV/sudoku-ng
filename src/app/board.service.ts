import { BoardRepositoryService } from "./board-repository.service";
import { SudokuService } from "./sudoku.service";

export class BoardService {
    constructor(repository: BoardRepositoryService, sudokuService: SudokuService) {
        console.log("BoardService initialized");
    }

    getBoard(): number[][] {
        return this.repository.getBoard();
    }
}