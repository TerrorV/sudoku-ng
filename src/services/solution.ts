import { CellData } from "./cell-data";

export class Solution{
    public board: CellData[][];
    public status: string;
    public difficulty: string;

    constructor(board: CellData[][], status: string, difficulty: string = "") {
        this.difficulty = difficulty;
        this.board = board;
        this.status = status;
    }
}