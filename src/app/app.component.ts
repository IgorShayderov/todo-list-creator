import { OnInit, Component } from '@angular/core';
import { ProjectsService } from './projects.service';
import { plainToClass } from 'class-transformer';

import { Project } from './models/project.class';
import { Todo } from './models/todo.class';

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
          resolve(plainToClass(Project, projectsData));
        });
    });
  }

  openTodoCreateForm(): void {
    this.shouldFormBeVisible = !this.shouldFormBeVisible;
  }

  closeForm(): void {
    this.shouldFormBeVisible = false;
  }
}
