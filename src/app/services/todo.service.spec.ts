import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new todo', () => {
    service.addTodo('Test Todo');

    expect(service.allTodos().length).toBe(1);
    expect(service.allTodos()[0].title).toBe('Test Todo');
    expect(service.allTodos()[0].completed).toBeFalse();

    localStorage.clear();
  });

  it('should toggle todo completed status', () => {
    service.addTodo('Toggle Todo');
    const todo = service.allTodos()[0];

    expect(todo.completed).toBeFalse();

    service.toggleCompleted(todo.id);
    const updatedTodo = service.allTodos()[0];

    expect(updatedTodo.completed).toBeTrue();

    localStorage.clear();
  });

  it('should delete a todo', () => {
    service.addTodo('Delete Todo');

    const todo = service.allTodos()[0];
    service.deleteTodo(todo.id);

    expect(service.allTodos().length).toBe(0);

    localStorage.clear();
  });

  it('should edit a todo title', () => {
    service.addTodo('Old Title');

    const todo = service.allTodos()[0];
    service.editTodo(todo.id, 'New Title');
    const updatedTodo = service.allTodos()[0];

    expect(updatedTodo.title).toBe('New Title');

    localStorage.clear();
  });

  it('should return active todos', () => {
    service.addTodo('Active Todo');
    service.addTodo('Completed Todo');

    const completedTodo = service.allTodos()[1];
    service.toggleCompleted(completedTodo.id);

    expect(service.activeTodos().length).toBe(1);
    expect(service.completedTodos().length).toBe(1);

    localStorage.clear();
  });

  it('should store and retrieve from localStorage', () => {
    service.addTodo('Persisted Todo');
    const storedTodos = service.getLocalTodos();

    expect(storedTodos.length).toBe(1);
    expect(storedTodos[0].title).toBe('Persisted Todo');

    const storedId = localStorage.getItem('todo_id');
    expect(storedId).toBe('2');

    localStorage.clear();
  });

  it('should sort allTodos with active first, then completed', () => {
    service.addTodo('First Active');
    service.addTodo('Second Active');
    service.addTodo('First Completed');
    service.toggleCompleted(service.allTodos()[2].id);

    const allTodos = service.allTodos();

    expect(allTodos[0].completed).toBeFalse();
    expect(allTodos[1].completed).toBeFalse();
    expect(allTodos[2].completed).toBeTrue();

    localStorage.clear();
  });
});
