import { Component, Input } from "@angular/core";
import { GridComponent } from "./grid.component";

@Component({
    selector: "app-sudoku-grid",
    imports: [GridComponent],
    template: `
        <div class="border-grid">
            <app-grid *ngFor="let subgrid in board" [subgrid]="subgrid"></app-grid>
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
    @Input() board: number[][] = [];
    
    constructor() {
        console.log("SudokuGridComponent initialized");
    }
}