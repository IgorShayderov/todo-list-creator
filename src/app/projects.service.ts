import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../environments/environment.prod';

import {
  Project,
  Todo,
  TodoChangeCompletenessData,
  NewTodoData
} from './interfaces/projects';

@Injectable()
export class ProjectsService {
  backendUrl = environment.backendUrl;

  constructor(private http: HttpClient) {
  }

  getProjectsData(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.backendUrl}/projects`);
  }

  createTodo(newTodoParams: NewTodoData): Observable<Todo> {
    const { text, categoryId, newCategoryTitle } = newTodoParams;

    return this.http.post<Todo>(`${this.backendUrl}/todos`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      project_id: categoryId,
      new_project_title: newCategoryTitle,
      todo: {
        text,
      }
    });
  }

  updateTodo(todoChangeCompletenessData: TodoChangeCompletenessData): Observable<{}> {
    const { categoryId, todoId } = todoChangeCompletenessData;

    return this.http.patch(`${this.backendUrl}/projects/${categoryId}/todos/${todoId}`, {});
  }
}
