import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { CompletedTodosComponent } from './components/completed-todos/completed-todos.component';
import { ActiveTodosComponent } from './components/active-todos/active-todos.component';

export const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: TodoListComponent },
    { path: 'add', component: AddTodoComponent },
    { path: 'completed', component: CompletedTodosComponent },
    { path: 'active', component: ActiveTodosComponent },
    { path: '**', component: NotFoundComponent },
];
