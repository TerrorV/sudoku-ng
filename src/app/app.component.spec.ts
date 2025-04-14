import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { GridComponent } from './grid.component';
import { ControlsComponent } from './controls.component';
import { StatusComponent } from './status.component';
import { BoardService } from '../services/board.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockBoardService: jasmine.SpyObj<BoardService>;

  beforeEach(async () => {
    mockBoardService = jasmine.createSpyObj('BoardService', ['initBoard', 'clearBoard', 'validateBoard', 'solveBoard', 'getBoard']);

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [GridComponent, ControlsComponent, StatusComponent],
      providers: [{ provide: BoardService, useValue: mockBoardService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start a game with the correct difficulty', async () => {
    mockBoardService.initBoard.and.returnValue(Promise.resolve());
    mockBoardService.getBoard.and.returnValue([]);

    await component.StartGame('easy');

    expect(mockBoardService.initBoard).toHaveBeenCalledWith('easy');
    expect(component.board).toEqual([]);
  });

  it('should handle difficulty click', async () => {
    spyOn(component, 'StartGame');
    component.onDifficultyClick('medium');

    expect(mockBoardService.clearBoard).toHaveBeenCalled();
    expect(component.StartGame).toHaveBeenCalledWith('medium');
  });
});