import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CellComponent } from './cell.component';
import { NgFor } from '@angular/common';
import { SudokuService } from '../services/sudoku.service';

@Component({
    selector: 'app-grid',
    imports: [CellComponent, NgFor],
    template: `
        <div class="grid">
            <!-- <app-cell *ngFor="let cell of subgrid; let i = index" [(value)]="subgrid[i]" [readonly]="subgrid[i]!==0" ></app-cell> -->
            <app-cell *ngFor="let cell of subgrid; let i = index" [value]="subgrid[i]" (valueChange)="onCellValueChange(i,$event)" [readonly]="subgrid[i]!==0" ></app-cell>
        </div>
    `,
    styles: [`
        .grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(3, 1fr);
            gap: 1px;
            border: 5px solid #ccc;
            background-color: gray;
        }
    `]
})
export class GridComponent {
    @Input() subgrid: number[] = [];
    @Output() subgridChange: EventEmitter<number[]> = new EventEmitter<number[]>();
    constructor(sudokuService: SudokuService) {
        // Initialize the grid with numbers from 1 to 81
        console.log('GridComponent initialized');
        // sudokuService.getBoard('easy').then((board) => {
        //     console.log('Fetched board:', board);
        //     this.cells = board.board.flat(); // Flatten the 2D array into a 1D array
        // })
    }
    
    getSubgrid(): number[] {
        return this.subgrid;
    }

    onCellValueChange(index: number, newValue: number): void {
        this.subgrid[index] = newValue; // Update the subgrid at the specified index
        this.subgridChange.emit(this.subgrid); // Emit the updated subgrid to notify the parent
        console.log(`Subgrid updated at index ${index}:`, this.subgrid);
    }
}
