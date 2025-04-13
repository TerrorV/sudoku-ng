import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CellComponent } from './cell.component';
import { NgFor } from '@angular/common';
import { SudokuService } from '../services/sudoku.service';
import { CellData } from '../services/cell-data';

@Component({
    selector: 'app-grid',
    imports: [CellComponent, NgFor],
    template: `
        <div class="grid">
            <!-- <app-cell *ngFor="let cell of subgrid; let i = index" [(value)]="subgrid[i]" [readonly]="subgrid[i]!==0" ></app-cell> -->
            <div *ngFor="let row of board; let rowIndex = index" class="row">
                <app-cell *ngFor="let cell of row; let colIndex = index" [value]="board[colIndex][rowIndex].currentValue" (valueChange)="onCellValueChange(colIndex,rowIndex,$event)" [readonly]="board[colIndex][rowIndex].initialValue !==0" ></app-cell>
            </div>
        </div>
    `,
    styles: [`
        .grid {
            display: flex;
            flex-direction: column; 
            gap: 1px;
            border: 5px solid #ccc;
            background-color: gray;
            width: fit-content;
            height: fit-content;
        }

        .row {
            display: flex; /* Ensures cells in the row are aligned horizontally */
        }
        
        .row:nth-child(3n) {
            border-bottom: 3px solid #ccc; 
        }
        
        .row:last-child {
            border-bottom: 1px solid #ccc; 
        }

        app-cell:nth-child(3n) {
            border-right: 3px solid #ccc; 
        }

        app-cell:last-child {
            border-right: 1px solid #ccc; 
        }
/*
        .grid > app-cell:nth-child(n + 19):nth-child(-n + 27),
        .grid > app-cell:nth-child(n + 46):nth-child(-n + 54),
        .grid > app-cell:nth-child(n + 73):nth-child(-n + 81) {
            border-bottom: 3px solid #000; 
        }

        .grid > app-cell:nth-child(9n + 1) {
                border-left: 3px solid #000; 
            }*/
    `]
})
export class GridComponent {
    // @Input() subgrid: CellData[] = [];
    @Input() board: CellData[][] = [];
    @Output() subgridChange: EventEmitter<CellData[]> = new EventEmitter<CellData[]>();
    constructor(sudokuService: SudokuService) {
        // Initialize the grid with numbers from 1 to 81
        console.log('GridComponent initialized');
        // sudokuService.getBoard('easy').then((board) => {
        //     console.log('Fetched board:', board);
        //     this.cells = board.board.flat(); // Flatten the 2D array into a 1D array
        // })
    }
    
    // getSubgrid(): CellData[] {
    //     return this.subgrid;
    // }

    onCellValueChange(colIndex: number,rowIndex:number, newValue: number): void {
        this.board[colIndex][rowIndex].currentValue = newValue; // Update the subgrid at the specified index
        // this.subgridChange.emit(this.subgrid); // Emit the updated subgrid to notify the parent
        console.log(`Board updated at index ${colIndex} ${rowIndex}:`, this.board);
    }
}
