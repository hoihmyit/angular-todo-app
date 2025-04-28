import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveTodosComponent } from './active-todos.component';
import { TodoService } from '../../services/todo.service';
import { FormsModule } from '@angular/forms';

describe('ActiveTodosComponent', () => {
  let component: ActiveTodosComponent;
  let fixture: ComponentFixture<ActiveTodosComponent>;
  let todoService: TodoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveTodosComponent, FormsModule],
    }).compileComponents();

    todoService = TestBed.inject(TodoService);
    fixture = TestBed.createComponent(ActiveTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle completed status when toggle is called', () => {
    const toggleSpy = spyOn(todoService, 'toggleCompleted').and.callThrough();
    component.toggle(1);

    expect(toggleSpy).toHaveBeenCalledWith(1);
  });

  it('should delete a todo when deleteTodo is called', () => {
    const deleteSpy = spyOn(todoService, 'deleteTodo').and.callThrough();
    component.deleteTodo(2);

    expect(deleteSpy).toHaveBeenCalledWith(2);
  });

  it('should set editingTodoId and editTitle when startEditing is called', () => {
    const todo = {
      id: 5,
      title: 'Edit me',
      completed: false,
      createdAt: new Date(),
    };
    component.startEditing(todo);

    expect(component.editingTodoId).toEqual(5);
    expect(component.editTitle).toEqual('Edit me');
  });

  it('should save edited todo and reset editing when saveEdit is called with valid title', () => {
    const editSpy = spyOn(todoService, 'editTodo').and.callThrough();
    component.editingTodoId = 3;
    component.editTitle = 'Updated title';
    component.saveEdit(3);

    expect(editSpy).toHaveBeenCalledWith(3, 'Updated title');
    expect(component.editingTodoId).toBeNull();
    expect(component.editTitle).toEqual('');
  });

  it('should NOT save if editTitle is empty when saveEdit is called', () => {
    const editSpy = spyOn(todoService, 'editTodo').and.callThrough();
    component.editingTodoId = 3;
    component.editTitle = '   ';
    component.saveEdit(3);

    expect(editSpy).not.toHaveBeenCalled();
    expect(component.editingTodoId).toEqual(3);
  });

  it('should return true from isActiveTodoEmpty if no active todos', () => {
    spyOn(todoService, 'activeTodos').and.returnValue([]);
    fixture.detectChanges();

    expect(component.isActiveTodoEmpty()).toBeTrue();
  });

  it('should return false from isActiveTodoEmpty if there are active todos', async () => {
    spyOn(todoService, 'activeTodos').and.returnValue([
      { id: 1, title: 'Active todo', completed: false, createdAt: new Date() },
    ]);

    // because computed() captures the original function at creation time, not dynamically.
    // Recreate component after spy
    fixture = TestBed.createComponent(ActiveTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.isActiveTodoEmpty()).toBeFalse();
  });
});
