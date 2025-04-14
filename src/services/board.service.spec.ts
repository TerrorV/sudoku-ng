import { TestBed } from '@angular/core/testing';
import { BoardService } from './board.service';
import { BoardRepositoryService } from './board-repository.service';
import { SudokuService } from './sudoku.service';
import { Solution } from './solution';

describe('BoardService', () => {
  let service: BoardService;
  let mockRepository: jasmine.SpyObj<BoardRepositoryService>;
  let mockSudokuService: jasmine.SpyObj<SudokuService>;

  beforeEach(() => {
    mockRepository = jasmine.createSpyObj('BoardRepositoryService', ['getBoard', 'setBoard', 'clearBoard']);
    mockSudokuService = jasmine.createSpyObj('SudokuService', ['getBoard', 'validateBoard', 'solveBoard']);

    TestBed.configureTestingModule({
      providers: [
        BoardService,
        { provide: BoardRepositoryService, useValue: mockRepository },
        { provide: SudokuService, useValue: mockSudokuService },
      ],
    });

    service = TestBed.inject(BoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize the board with a given difficulty', async () => {
    const mockBoard = { board: [[1, 2], [3, 4]] };
    mockSudokuService.getBoard.and.returnValue(Promise.resolve(mockBoard));

    await service.initBoard('easy');

    expect(mockRepository.clearBoard).toHaveBeenCalled();
    expect(mockSudokuService.getBoard).toHaveBeenCalledWith('easy');
    expect(mockRepository.setBoard).toHaveBeenCalledWith(mockBoard.board);
  });

  it('should validate the board', async () => {
    const mockValidationResult = { status: 'valid' };
    mockRepository.getBoard.and.returnValue([[{
        currentValue: 1,
        initialValue: 0,
        fixed: false
    }, {
        currentValue: 2,
        initialValue: 0,
        fixed: false
    }]]);
    mockSudokuService.validateBoard.and.returnValue(Promise.resolve(mockValidationResult));

    const result = await service.validateBoard();

    expect(mockRepository.getBoard).toHaveBeenCalled();
    expect(mockSudokuService.validateBoard).toHaveBeenCalledWith([[1, 2]]);
    expect(result).toEqual(mockValidationResult);
  });

  it('should solve the board', async () => {
    const mockSolution = { solution: [[1, 2], [3, 4]], status: 'solved', difficulty: 'easy' };
    mockRepository.getBoard.and.returnValue([[{
        currentValue: 1,
        initialValue: 0,
        fixed: false
    }, {
        currentValue: 2,
        initialValue: 0,
        fixed: false
    }],
    [{
        currentValue: 3,
        initialValue: 0,
        fixed: false
    }, {
        currentValue: 4,
        initialValue: 0,
        fixed: false
    }]]);
    mockSudokuService.solveBoard.and.returnValue(Promise.resolve(mockSolution));

    const result = await service.solveBoard();
    console.log("result", result);
    expect(mockRepository.getBoard).toHaveBeenCalled();
    expect(mockSudokuService.solveBoard).toHaveBeenCalledWith([[1, 2],[3, 4]]);
    expect(mockRepository.setBoard).toHaveBeenCalledWith(mockSolution.solution);
    const cellDataSolution = mockSolution.solution.map(row => row.map(value => ({ currentValue: value, initialValue: 0, fixed: false })));
    console.log("cellDataSolution", cellDataSolution);
    console.log("mockSolution.status", mockSolution);
    expect(result).toEqual(new Solution(cellDataSolution, mockSolution.status, mockSolution.difficulty));
  });
});