import { Component } from '@angular/core';
import { projects } from './projects';
import { Project, NewTodoData } from './interfaces/projects';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  shouldFormBeVisible = false;
  projects: Project[] = projects;

  title = 'todo-list-creator';

  openTodoCreateForm(): void {
    this.shouldFormBeVisible = !this.shouldFormBeVisible;
  }

  closeForm(): void {
    this.shouldFormBeVisible = false;
  }

  addNewTodoItem(newTodoData: NewTodoData): void {
    const { categoryId, text } = newTodoData;
    const newTodoProject = this.projects.find((project) => project.id === parseInt(categoryId, 10));

    if (typeof newTodoProject !== 'undefined') {
      newTodoProject.todos.push({
        id: 0,
        text,
        is_completed: false,
      });
    }
  }
}
