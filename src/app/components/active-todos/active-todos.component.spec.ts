import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveTodosComponent } from './active-todos.component';

describe('ActiveTodosComponent', () => {
  let component: ActiveTodosComponent;
  let fixture: ComponentFixture<ActiveTodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveTodosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
