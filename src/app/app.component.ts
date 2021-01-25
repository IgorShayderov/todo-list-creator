import { OnInit, Component } from '@angular/core';
import {
  Project,
  Todo,
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

  async ngOnInit(): Promise<void> {
    const projectsData = await this.getProjects();
    this.projects = projectsData;
  }

  identify(index: number, item: Project): number {
    return item.id;
  }

  getProjects(): Promise<Project[]> {
    return new Promise((resolve) => {
      this.projectsService.getProjectsData()
        .subscribe((projectsData: Project[]) => {
          resolve(projectsData);
        });
    });
  }

  openTodoCreateForm(): void {
    this.shouldFormBeVisible = !this.shouldFormBeVisible;
  }

  closeForm(): void {
    this.shouldFormBeVisible = false;
  }

  addNewTodoItem(newTodo: Todo): void {
    const { id, text, is_completed, project } = newTodo;
    const todoProject = this.projects.find((existingProject) => existingProject.id === project?.id);

    if (typeof todoProject === 'undefined' && typeof project !== 'undefined') {
      this.projects.push({
        id: project.id,
        title: project.title,
        todos : [{
          id,
          text,
          is_completed,
        }]
      });
    } else {
      todoProject?.todos?.push({
        id,
        text,
        is_completed,
      });
    }
  }

  findTodoChangeCompleteness(todoChangeCompletenessData: TodoChangeCompletenessData): void {
    const { categoryId, todoId } = todoChangeCompletenessData;

    const category: Project | undefined = this.projects.find((project) => project.id === categoryId);

    if (typeof category !== 'undefined') {
      const changingTodo: Todo | undefined = category?.todos?.find((todo) => todo.id === todoId);

      if (typeof changingTodo !== 'undefined') {
        changingTodo.is_completed = !changingTodo.is_completed;
      }
    }
  }
}
