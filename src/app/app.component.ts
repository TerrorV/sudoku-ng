import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardService } from '../services/board.service';
import { SudokuGridComponent } from "./sudoku-grid.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SudokuGridComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sudoku-ng';
  board: number[][] = [];
  constructor(boardService: BoardService) {
    console.log('AppComponent initialized');
    boardService.initBoard('easy').then(() => {
      this.board = boardService.getBoard();
      console.log('Board initialized:', boardService.getBoard());
    });
  }
}
