export class CellData {
    public currentValue: number;
    public initialValue: number;
    public fixed: boolean;

    constructor(currentValue: number, initialValue: number, fixed: boolean) {
        this.currentValue = currentValue;
        this.initialValue = initialValue;        
        this.fixed = fixed;
    }
}