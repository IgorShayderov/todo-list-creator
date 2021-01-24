import { OnInit, Component } from '@angular/core';
import {
  Project,
  Todo,
  NewTodoData,
  TodoChangeCompletenessData
} from './interfaces/projects';
import { ProjectsService } from './projects.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ProjectsService],
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  shouldFormBeVisible = false;
  projects: Project[] = [];

  title = 'todo-list-creator';

  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
      this.projectsService.getProjectsData()
        .subscribe((projectsData: Project[]) => {
          this.projects = projectsData;
        });
  }

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

  findTodoChangeCompleteness(todoChangeCompletenessData: TodoChangeCompletenessData): void {
    const { categoryId, todoId } = todoChangeCompletenessData;

    const category: Project | undefined = this.projects.find((project) => project.id === categoryId);

    if (typeof category !== 'undefined') {
      const changingTodo: Todo | undefined = category?.todos.find((todo) => todo.id === todoId);

      if (typeof changingTodo !== 'undefined') {
        changingTodo.is_completed = !changingTodo.is_completed;
      }
    }
  }
}
