import { BoardRepositoryService } from "./board-repository.service";
import { SudokuService } from "./sudoku.service";

export class BoardService {
    private repository: BoardRepositoryService;
    private sudokuService: SudokuService;

    constructor(repository: BoardRepositoryService, sudokuService: SudokuService) {
        this.repository = repository;
        this.sudokuService = sudokuService;
        console.log("BoardService initialized");
    }

    getBoard(): number[][] {
        return this.repository.getBoard();
    }

    clearBoard(): void {
        this.repository.clearBoard();
    }

    async initBoard(difficulty: 'easy' | 'medium' | 'hard' | 'random'): Promise<void> {
        this.repository.clearBoard();
        let board = await this.sudokuService.getBoard(difficulty);
    }

    async validateBoard(): Promise<boolean> {
        const board = this.repository.getBoard();
        let result = await this.sudokuService.validateBoard(board)
        return true; // Placeholder for actual validation result
    }
}