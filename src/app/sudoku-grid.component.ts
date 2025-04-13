import { Component, EventEmitter, Input, Output } from "@angular/core";
import { GridComponent } from "./grid.component";
import { NgFor } from "@angular/common";
import { CellData } from "../services/cell-data";

@Component({
    selector: "app-sudoku-grid",
    imports: [GridComponent, NgFor],
    template: `
        <div class="border-grid">
            <app-grid *ngFor="let subgrid of board; let i = index" [board]="board" (subgridChange)="onSubgridChange(i,$event)"></app-grid>
        </div>
    `,
    styles: [
        `
            .border-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                grid-template-rows: repeat(3, 1fr);
                gap: 1px;
                width: 300px;
                height: 300px;
                background-color: gray;
            }
        `,
    ],
})
export class SudokuGridComponent {
    @Input() board: CellData[][] = [];
    @Output() boardChange: EventEmitter<CellData[][]> = new EventEmitter<CellData[][]>();
    
    constructor() {
        console.log(this.board);
        console.log("SudokuGridComponent initialized");
    }

    getBoard(): CellData[][] {
        return this.board;
    }

    onSubgridChange(index: number, subgrid: CellData[]): void {
        this.board[index] = subgrid; // Update the board at the specified index
        this.boardChange.emit(this.board); // Emit the updated board to notify the parent
        console.log(`Board updated at index ${index}:`, this.board);
    }
}