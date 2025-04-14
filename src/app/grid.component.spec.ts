import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridComponent } from './grid.component';
import { CellComponent } from './cell.component';
import { By } from '@angular/platform-browser';

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CellComponent],
      declarations: [GridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    component.board = [
      [{
          currentValue: 1, initialValue: 1,
          fixed: false
      }, {
          currentValue: 2, initialValue: 0,
          fixed: false
      }],
      [{
          currentValue: 3, initialValue: 3,
          fixed: false
      }, {
          currentValue: 4, initialValue: 0,
          fixed: false
      }],
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct number of rows and cells', () => {
    const rows = fixture.debugElement.queryAll(By.css('.row'));
    expect(rows.length).toBe(2);

    const cells = fixture.debugElement.queryAll(By.css('app-cell'));
    expect(cells.length).toBe(4);
  });

  it('should handle cell value changes', () => {
    spyOn(component, 'onCellValueChange');
    const cell = fixture.debugElement.query(By.css('app-cell'));
    cell.triggerEventHandler('valueChange', 5);

    expect(component.onCellValueChange).toHaveBeenCalledWith(0, 0, 5);
  });
});