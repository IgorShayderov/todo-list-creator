import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  Project,
  Todo,
  TodoChangeCompletenessData
} from '../interfaces/projects';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  providers: [ProjectsService],
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  @Input()
  project!: Project;

  @Output() todoCompletenessChange = new EventEmitter<TodoChangeCompletenessData>();

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

  async changeTodoCompleteness(todoId: number): Promise<void> {
    const todoChangeCompletenessData = {
      categoryId: this.project.id,
      todoId
    };

    await this.updateTodo(todoChangeCompletenessData);
    this.todoCompletenessChange.emit(todoChangeCompletenessData);
  }

}
