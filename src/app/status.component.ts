import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-status',
    standalone: true,
    template: `
        <div class="status">
            <h2>Status</h2>
            <p>{{ message }}</p>
        </div>
    `,
    styles: [
        `
            .status {
                padding: 10px;
                border: 1px solid #ccc;
                background-color: #f9f9f9;
            }
        `
    ]
})
export class StatusComponent {
    @Input() message: string = "";
    constructor() {
        console.log("StatusComponent initialized");
    }
}