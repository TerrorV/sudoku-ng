import { Injectable } from '@angular/core';
import { environment }  from '../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class SudokuService {
    private baseUrl = environment.baseUrl;

    constructor() {}

    // Fetch a puzzle board with the specified difficulty
    async getBoard(difficulty: 'easy' | 'medium' | 'hard' | 'random'): Promise<any> {
        const params = new URLSearchParams({ difficulty });
        const response = await fetch(`${this.baseUrl}/board?${params.toString()}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch board: ${response.statusText}`);
        }
        return response.json();
    }

    // Solve a given puzzle board
    async solveBoard(board: number[][]): Promise<any> {
        const body = this.encodeParams({ board });
        const response = await fetch(`${this.baseUrl}/solve`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body,
        });
        if (!response.ok) {
            throw new Error(`Failed to solve board: ${response.statusText}`);
        }
        return response.json();
    }

    // Grade the difficulty of a given puzzle board
    async gradeBoard(board: number[][]): Promise<any> {
        const body = this.encodeParams({ board });
        const response = await fetch(`${this.baseUrl}/grade`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body,
        });
        if (!response.ok) {
            throw new Error(`Failed to grade board: ${response.statusText}`);
        }
        return response.json();
    }

    // Validate the status of a given puzzle board
    async validateBoard(board: number[][]): Promise<any> {
        const body = this.encodeParams({ board });
        const response = await fetch(`${this.baseUrl}/validate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body,
        });
        if (!response.ok) {
            throw new Error(`Failed to validate board: ${response.statusText}`);
        }
        return response.json();
    }

    // Helper method to encode the board as URL-encoded parameters
    private encodeParams(params: any): string {
        return Object.keys(params)
            .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(params[key]))}`)
            .join('&');
    }
}