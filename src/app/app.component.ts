import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GridComponent } from './grid.component';
import { SudokuService } from '../services/sudoku.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GridComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sudoku-ng';
  constructor(sudokuService: SudokuService) {
    console.log('AppComponent initialized');
  }
}
