import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import {
  Project,
  Todo,
  TodoChangeCompletenessData,
  NewTodoData
} from './interfaces/projects';

@Injectable()
export class ProjectsService {

  rootUrl = 'https://peaceful-plains-17890.herokuapp.com';
  // rootUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient) {}


  getProjectsData(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.rootUrl}/projects`);
  }

  createTodo(newTodoParams: NewTodoData): Observable<Todo> {
    return this.http.post<Todo>(`${this.rootUrl}/todos`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      project_id: newTodoParams.categoryId,
      todo: {
        text: newTodoParams.text,
      }
    });
  }

  updateTodo(todoChangeCompletenessData: TodoChangeCompletenessData): Observable<{}> {
    const { categoryId, todoId } = todoChangeCompletenessData;

    return this.http.patch(`${this.rootUrl}/projects/${categoryId}/todos/${todoId}`, {});
  }
}
