import { computed, Injectable, signal } from '@angular/core';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private currentId = 1;
  private todos = signal<Todo[]>(this.getLocalTodos());

  readonly activeTodos = computed(() => this.todos().filter(t => !t.completed));
  readonly completedTodos = computed(() => this.todos().filter(t => t.completed));

  // Sort todos with active todos first, then completed todos, ordered by createdAt
  readonly allTodos = computed(() => {
    return this.todos().slice().sort((a, b) => {
      // Sort active todos first
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1; // active todos come before completed todos
      }

      // If both have the same completion status, sort by createdAt (ascending)
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
  });

  getLocalTodos(): Todo[] {
    return JSON.parse(localStorage.getItem('todos') || '[]');
  }

  saveToLocalStorage(todos: Todo[]) {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('todo_id', String(this.currentId));
  }

  addTodo(title: string) {
    const newTodo: Todo = {
      id: this.currentId++,
      title,
      completed: false,
      createdAt: new Date()
    };
    const saved = [...this.todos(), newTodo];
    this.todos.set(saved);
    this.saveToLocalStorage(saved);
  }

  toggleCompleted(id: number) {
    const updated = this.todos().map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    this.todos.set(updated);
    this.saveToLocalStorage(updated);
  }

  deleteTodo(id: number) {
    const updatedTodos = this.todos().filter(todo => todo.id !== id);
    this.todos.set(updatedTodos);
    this.saveToLocalStorage(updatedTodos);
  }

  editTodo(id: number, newTitle: string) {
    const updated = this.todos().map(t =>
      t.id === id ? { ...t, title: newTitle } : t
    );
    this.todos.set(updated);
    this.saveToLocalStorage(updated);
  }

}
