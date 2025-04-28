import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { TodoService } from '../../services/todo.service';
import { By } from '@angular/platform-browser';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let todoService: TodoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent],
    }).compileComponents();

    todoService = TestBed.inject(TodoService);
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display todos from the service', () => {
    todoService.addTodo('First Todo');
    todoService.addTodo('Second Todo');
    fixture.detectChanges();

    const todoItems = fixture.debugElement.queryAll(By.css('.todo-item-card'));
    expect(todoItems.length).toBe(2);

    localStorage.clear();
  });

  it('should toggle a todo when checkbox is clicked', () => {
    todoService.addTodo('Toggle me');
    fixture.detectChanges();

    const checkbox = fixture.debugElement.query(By.css('mat-checkbox input'));
    checkbox.nativeElement.click();
    fixture.detectChanges();

    const todo = todoService.allTodos()[0];
    expect(todo.completed).toBeTrue();

    localStorage.clear();
  });

  it('should delete a todo when delete button is clicked', () => {
    todoService.addTodo('Delete me');
    fixture.detectChanges();

    const deleteButton = fixture.debugElement.query(
      By.css('button[color="warn"]')
    );
    deleteButton.nativeElement.click();
    fixture.detectChanges();

    expect(todoService.allTodos().length).toBe(0);

    localStorage.clear();
  });

  it('should start editing a todo', () => {
    todoService.addTodo('Edit me');
    fixture.detectChanges();

    const editButton = fixture.debugElement.query(
      By.css('button[color="primary"]')
    );
    editButton.nativeElement.click();
    fixture.detectChanges();

    expect(component.editingTodoId).toBe(todoService.allTodos()[0].id);
    expect(component.editTitle).toBe(todoService.allTodos()[0].title);

    localStorage.clear();
  });

  it('should save edited todo title', () => {
    todoService.addTodo('Old Title');
    fixture.detectChanges();

    component.startEditing(todoService.allTodos()[0]);
    component.editTitle = 'New Title';
    fixture.detectChanges();

    component.saveEdit(todoService.allTodos()[0].id);
    fixture.detectChanges();

    const updatedTodo = todoService.allTodos()[0];
    expect(updatedTodo.title).toBe('New Title');

    localStorage.clear();
  });

  it('should show no todos message if list is empty', () => {
    fixture.detectChanges();

    const noTodosMessage = fixture.debugElement.query(
      By.css('.no-todos-message')
    );
    expect(noTodosMessage).toBeTruthy();
    expect(noTodosMessage.nativeElement.textContent).toContain('No todos yet.');

    localStorage.clear();
  });
});
