import {
  Component,
  OnInit,
  Input,
} from '@angular/core';
import { TodoChangeCompletenessData } from '../interfaces/projects';
import { ProjectsService } from '../projects.service';

import { Project } from '../models/project.class';
import { Todo } from '../models/todo.class';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  providers: [ProjectsService],
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  @Input()
  project!: Project;

  constructor(private projectsService: ProjectsService) { }

  ngOnInit(): void {
  }

  identify(index: number, item: Todo): number {
    return item.id;
  }

  updateTodo(todoChangeCompletenessData: TodoChangeCompletenessData): Promise<void> {
    return new Promise((resolve) => {
      this.projectsService.updateTodo(todoChangeCompletenessData)
      .subscribe(() => resolve());
    });
  }

  async changeTodoCompleteness(event: Event, todo: Todo): Promise<void> {
    event.preventDefault();

    const todoChangeCompletenessData = {
      categoryId: this.project.id,
      todoId: todo.id,
    };

    await this.updateTodo(todoChangeCompletenessData);
    todo.changeCompleteness();
  }

}
