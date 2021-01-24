import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Project, TodoChangeCompletenessData } from '../interfaces/projects';
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

  updateTodo(todoChangeCompletenessData: TodoChangeCompletenessData): void {
      this.projectsService.updateTodo(todoChangeCompletenessData)
        .subscribe();
  }

  changeTodoCompleteness(todoId: number): void {
    const todoChangeCompletenessData = {
      categoryId: this.project.id,
      todoId
    };
    this.updateTodo(todoChangeCompletenessData);

    this.todoCompletenessChange.emit(todoChangeCompletenessData);
  }

}
