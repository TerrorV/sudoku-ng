import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'app-controls',
    template: `
        <div class="controls">
            <div>
                <label>
                    <input type="radio" name="difficulty" value="Easy" (click)="onDifficultyChange('easy')" /> Easy
                </label>
                <label>
                    <input type="radio" name="difficulty" value="Medium" (click)="onDifficultyChange('medium')" /> Medium
                </label>
                <label>
                    <input type="radio" name="difficulty" value="Hard" (click)="onDifficultyChange('hard')" /> Hard
                </label>
                <label>
                    <input type="radio" name="difficulty" value="Random" (click)="onDifficultyChange('random')" /> Random
                </label>
            </div>

            <button (click)="onSolveClick()">Solve</button>
            <button (click)="onValidateClick()">Validate</button>

`
})

export class ControlsComponent {
    @Output() solveClick: EventEmitter<void> = new EventEmitter<void>();
    @Output() validateClick: EventEmitter<void> = new EventEmitter<void>();
    @Output() difficultyClick: EventEmitter<"easy"|"medium"|"hard"|"random"> = new EventEmitter<"easy"|"medium"|"hard"|"random">();
    constructor() {
        console.log('ControlsComponent initialized');
    }

    onSolveClick(): void {
        this.solveClick.emit();
    }

    onValidateClick(): void {
        this.validateClick.emit();
    }

    onDifficultyChange(difficulty: "easy"|"medium"|"hard"|"random"): void {
        this.difficultyClick.emit(difficulty);
    }
}