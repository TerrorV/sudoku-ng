import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardService } from '../services/board.service';
// import { SudokuGridComponent } from "./sudoku-grid.component";
import { CellData } from '../services/cell-data';
import { GridComponent } from './grid.component';
import { ControlsComponent } from "./controls.component";
import { StatusComponent } from "./status.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GridComponent, ControlsComponent, StatusComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Hocus Pocus Sudokus';
  board: CellData[][] = [];
  boardService: BoardService;
  status: string = 'ready';

  constructor(boardService: BoardService) {
    this.boardService = boardService;
    console.log('AppComponent initialized');
    this.StartGame('easy');
  }

  async StartGame(difficulty: "easy" | "medium" | "hard" | "random" = "easy") {
    await this.boardService.initBoard(difficulty);
    this.board = this.boardService.getBoard();
    console.log('Board initialized:', this.board);
    this.status = 'Playing on ' + difficulty + ' level';
  
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
  this.status = 'Validation result: ' + result.status;
  console.log('Validation result:', result);
  //throw new Error('Method not implemented.');
}
  async onSolveClick() {
    let solution =await this.boardService.solveBoard();
    this.status = 'Solution status: ' + solution.status + ' on ' + solution.difficulty;
    this.board = solution.board;
    console.log('Solved board:', this.board);
    // this.board = this.boardService.getBoard();
  //throw new Error('Method not implemented.');
}

}
