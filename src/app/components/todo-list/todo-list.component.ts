import { Component, computed } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../models/todo.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-todo-list',
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
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  editingTodoId: number | null = null;
  editTitle: string = '';

  constructor(private todoService: TodoService) { }

  allTodos = computed(() => this.todoService.allTodos());
  isTodoListEmpty = computed(() => this.allTodos().length === 0);

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
