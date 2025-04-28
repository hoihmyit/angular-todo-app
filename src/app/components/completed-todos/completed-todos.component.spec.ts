import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedTodosComponent } from './completed-todos.component';
import { TodoService } from '../../services/todo.service';

describe('CompletedTodosComponent', () => {
  let component: CompletedTodosComponent;
  let fixture: ComponentFixture<CompletedTodosComponent>;
  let todoService: TodoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletedTodosComponent],
      providers: [TodoService], // real TodoService
    }).compileComponents();

    todoService = TestBed.inject(TodoService);
    fixture = TestBed.createComponent(CompletedTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show empty when no completed todos', () => {
    expect(component.isCompletedTodoEmpty()).toBeTrue();
  });

  it('should return false from isCompletedTodoEmpty when completed todos exist', () => {
    // add a completed todo
    todoService.addTodo('Test completed todo');
    const addedTodo = todoService['todos']().find(
      (t) => t.title === 'Test completed todo'
    );
    if (addedTodo) {
      todoService.toggleCompleted(addedTodo.id); // mark it completed
    }

    fixture.detectChanges(); // recalculate computed properties

    expect(component.isCompletedTodoEmpty()).toBeFalse();

    localStorage.clear();
  });

  it('should list completed todos', () => {
    todoService.addTodo('Completed Todo Example');
    const todo = todoService['todos']().find(
      (t) => t.title === 'Completed Todo Example'
    );
    if (todo) {
      todoService.toggleCompleted(todo.id); // mark as completed
    }

    fixture.detectChanges();

    const completed = component.completedTodos();
    expect(completed.length).toBe(1);
    expect(completed[0].title).toBe('Completed Todo Example');
    expect(completed[0].completed).toBeTrue();

    localStorage.clear();
  });

  it('should delete a completed todo', () => {
    todoService.addTodo('Completed Todo to Delete');
    const todo = todoService['todos']().find(
      (t) => t.title === 'Completed Todo to Delete'
    );
    if (todo) {
      todoService.toggleCompleted(todo.id);
    }

    fixture.detectChanges();
    expect(component.completedTodos().length).toBe(1);

    if (todo) {
      component.deleteTodo(todo.id);
    }

    fixture.detectChanges();
    expect(component.completedTodos().length).toBe(0);
    expect(component.isCompletedTodoEmpty()).toBeTrue();

    localStorage.clear();
  });
});
