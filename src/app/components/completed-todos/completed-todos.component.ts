import { Component, computed } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-completed-todos',
  imports: [CommonModule, MatCardModule, MatCheckboxModule, MatIconModule, MatButtonModule],
  templateUrl: './completed-todos.component.html',
  styleUrl: './completed-todos.component.css'
})
export class CompletedTodosComponent {

  constructor(private todoService: TodoService) { }

  isCompletedTodoEmpty = computed(() => this.completedTodos().length === 0);

  completedTodos = computed(() => {
    return this.todoService.completedTodos();
  });

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id);
  }

}
