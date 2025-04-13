import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardService } from '../services/board.service';
// import { SudokuGridComponent } from "./sudoku-grid.component";
import { CellData } from '../services/cell-data';
import { GridComponent } from './grid.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GridComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Hocus Pocus Sudokus';
  board: CellData[][] = [];
  constructor(boardService: BoardService) {
    console.log('AppComponent initialized');
    boardService.initBoard('easy').then(() => {
      this.board = boardService.getBoard();
      console.log('Board initialized:', boardService.getBoard());
    });
  }
}
