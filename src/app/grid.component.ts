import { Component, Input } from '@angular/core';
import { CellComponent } from './cell.component';
import { NgFor } from '@angular/common';
import { SudokuService } from './sudoku.service';

@Component({
    selector: 'app-grid',
    imports: [CellComponent, NgFor],
    template: `
        <div class="grid">
            <app-cell *ngFor="let cell of cells" [value]="cell" [readonly]="cell!==0" ></app-cell>
        </div>
    `,
    styles: [`
        .grid {
            display: grid;
            grid-template-columns: repeat(9, 1fr);
            grid-template-rows: repeat(9, 1fr);
            gap: 1px;
            width: 300px;
            height: 300px;
            background-color: gray;
        }
    `]
})
export class GridComponent {
    @Input() subgrid: number[] = [];
    /**
     *
     */
    constructor(sudokuService: SudokuService) {
        // Initialize the grid with numbers from 1 to 81
        console.log('GridComponent initialized');
        sudokuService.getBoard('easy').then((board) => {
            console.log('Fetched board:', board);
            this.cells = board.board.flat(); // Flatten the 2D array into a 1D array
        })
    }
    cells: number[] = Array.from({ length: 81 }, (_, i) => 0);
}
