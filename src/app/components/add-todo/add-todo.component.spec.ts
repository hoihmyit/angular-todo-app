import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTodoComponent } from './add-todo.component';
import { TodoService } from '../../services/todo.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('AddTodoComponent', () => {
  let component: AddTodoComponent;
  let fixture: ComponentFixture<AddTodoComponent>;
  let todoService: TodoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTodoComponent, FormsModule, ReactiveFormsModule],
    }).compileComponents();

    todoService = TestBed.inject(TodoService);
    fixture = TestBed.createComponent(AddTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.todoForm.valid).toBeFalsy();
  });

  it('form should be valid when title is filled', () => {
    component.todoForm.controls['title'].setValue('New Task');
    expect(component.todoForm.valid).toBeTruthy();
  });

  it('should call todoService.addTodo() and reset form on submit', () => {
    const addTodoSpy = spyOn(todoService, 'addTodo').and.callThrough();
    component.todoForm.controls['title'].setValue('Test Task');
    fixture.detectChanges();

    component.onSubmit();

    expect(addTodoSpy).toHaveBeenCalledWith('Test Task');
    expect(component.todoForm.value.title).toBeNull();
    expect(component.todoForm.valid).toBeFalsy();
  });

  it('should disable submit button if form is invalid', () => {
    const submitButton = fixture.debugElement.query(
      By.css('button[type="submit"]')
    ).nativeElement;
    expect(submitButton.disabled).toBeTruthy();
  });

  it('should enable submit button when form is valid', () => {
    component.todoForm.controls['title'].setValue('Another Task');
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(
      By.css('button[type="submit"]')
    ).nativeElement;
    expect(submitButton.disabled).toBeFalsy();
  });
});
