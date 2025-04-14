import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardService } from '../services/board.service';
// import { SudokuGridComponent } from "./sudoku-grid.component";
import { CellData } from '../services/cell-data';
import { GridComponent } from './grid.component';
import { ControlsComponent } from "./controls.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GridComponent, ControlsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Hocus Pocus Sudokus';
  board: CellData[][] = [];
  boardService: BoardService;

  constructor(boardService: BoardService) {
    this.boardService = boardService;
    console.log('AppComponent initialized');
    this.StartGame('easy');
  }

  async StartGame(difficulty: "easy" | "medium" | "hard" | "random" = "easy") {
    await this.boardService.initBoard(difficulty);
    this.board = this.boardService.getBoard();
    console.log('Board initialized:', this.board);
  
}

  async onDifficultyClick($event: "easy" | "medium" | "hard" | "random") {
  this.boardService.clearBoard();
  this.StartGame($event);
  // await this.boardService.initBoard($event);
  console.log('Difficulty clicked:', $event);
  // throw new Error('Method not implemented.');
}
  async onValidateClick() {
  let result = await this.boardService.validateBoard();
  console.log('Validation result:', result);
  //throw new Error('Method not implemented.');
}
  async onSolveClick() {
    this.board =await this.boardService.solveBoard();
    console.log('Solved board:', this.board);
    // this.board = this.boardService.getBoard();
  //throw new Error('Method not implemented.');
}

}
