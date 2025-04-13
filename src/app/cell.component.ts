import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-cell',
    imports: [NgClass],
    standalone: true,
    template: `
        <div class="cell" >
            <input
                type="number"
                [value]="value"
                (input)="onInputChange($event)"
                [readonly]="readonly"
                min="0"
                max="9"
                [ngClass]="{'cell-input': !readonly, 'cell-input-readonly': readonly}"
            />
        </div>
    `,
    styles: [
        `
            .cell {
                display: flex;
                justify-content: center;
                align-items: center;
                border: 1px solid #ccc;
                width: 50px;
                height: 50px;
            }
            .cell-readonly {
                display: flex;
                justify-content: center;
                align-items: center;
                border: 1px solid #ccc;
                width: 50px;
                height: 50px;
                background-color: #f0f0f0;
            }
            .cell-input {
                width: 100%;
                height: 100%;
                text-align: center;
                border: none;
                font-size: 1.2rem;
            }
            
            .cell-input {
                width: 100%;
                height: 100%;
                text-align: center;
                border: none;
                font-size: 1.2rem;
            }
            .cell-input-readonly {
                width: 100%;
                height: 100%;
                text-align: center;
                border: none;
                font-size: 1.2rem;
                background-color: #f0f0f0;
            }

            .cell-input:focus {
                outline: none;
            }
        `,
    ],
})
export class CellComponent {
    @Input() value: number = 0;
    @Input() readonly: boolean = false; // Input property to set the read-only state of the cell
    @Output() valueChange = new EventEmitter<number>(); 

    onInputChange(event: Event): void {
        console.log('Is readonly:', this.readonly); // Log the input change event for debugging
        if (this.readonly) {
           // return; // Ignore input changes if the cell is read-only
        }

        const input = event.target as HTMLInputElement;
        let tempValue = parseInt(input.value, 10) || 0;
        //tempValue = Math.max(0, Math.min(tempValue, 9));
        input.value = tempValue.toString(); // Update the input value to the clamped value
        this.valueChange.emit(tempValue); // Emit the new value to the parent component
        console.log(`Cell value changed to: ${this.value}`); // Log the change for debugging
    }
}