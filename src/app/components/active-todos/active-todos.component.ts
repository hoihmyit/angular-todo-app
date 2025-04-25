import { Component, computed } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Todo } from '../../models/todo.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-active-todos',
  imports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './active-todos.component.html',
  styleUrl: './active-todos.component.css',
})
export class ActiveTodosComponent {
  editingTodoId: number | null = null;
  editTitle: string = '';

  constructor(private todoService: TodoService) { }

  activeTodos = computed(() => this.todoService.activeTodos());
  isActiveTodoEmpty = computed(() => this.activeTodos().length === 0);

  toggle(id: number) {
    this.todoService.toggleCompleted(id);
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id);
  }

  startEditing(todo: Todo) {
    this.editingTodoId = todo.id;
    this.editTitle = todo.title;
  }

  saveEdit(id: number) {
    if (this.editTitle.trim()) {
      this.todoService.editTodo(id, this.editTitle.trim());
      this.editingTodoId = null;
      this.editTitle = '';
    }
  }
}
