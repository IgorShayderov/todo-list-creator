import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

import { NewTodoData, CreatedTodoData  } from '../interfaces/projects';
import { ProjectsService } from '../projects.service';
import { plainToClass } from 'class-transformer';
import { Project } from '../models/project.class';
import { Todo } from '../models/todo.class';

@Component({
  selector: 'app-todo-creator',
  templateUrl: './todo-creator.component.html',
  providers: [ProjectsService],
  styleUrls: ['./todo-creator.component.scss']
})
export class TodoCreatorComponent implements OnInit {
  todoCreateForm!: FormGroup;
  newCategoryInputVisibility = false;
  isSubmitted = false;

  private newCategoryValidators = [
    Validators.minLength(2),
    Validators.maxLength(40)
  ];

  @Input() projects: Project[] = [];
  @Input() shouldFormBeVisible = false;

  @Output() changeFormVisibilityFlag = new EventEmitter<boolean>();

  @ViewChild('categorySelect')
  categorySelect!: HTMLInputElement;

  constructor(private fb: FormBuilder, private projectsService: ProjectsService) { }

  initForm(): void {
    this.todoCreateForm = this.fb.group({
      text: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(40)
      ]],
      categoryId: [0, [
        Validators.required,
        Validators.min(1),
      ]],
      newCategoryTitle: ['', this.newCategoryValidators]
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  onCategoryChange(categoryId: string): void {
    this.newCategoryInputVisibility = categoryId === 'new';

    if (this.newCategoryInputVisibility) {
      this.todoCreateForm.get('newCategoryTitle')
        ?.setValidators(this.newCategoryValidators.concat(Validators.required));
    } else {
      this.todoCreateForm.get('newCategoryTitle')
        ?.setValidators(this.newCategoryValidators);
    }
  }

  closeForm(): void {
    this.changeFormVisibilityFlag.emit();
  }

  onReset(): void {
    this.closeForm();
  }

  createTodo(newTodoParams: NewTodoData): Promise<CreatedTodoData> {
    return new Promise((resolve) => {
      this.projectsService.createTodo(newTodoParams)
      .subscribe((createdTodoData) => resolve(createdTodoData));
    });
  }

  async onSubmit(): Promise<void> {
    if (!this.isSubmitted) {
      this.isSubmitted = true;
      const controls = this.todoCreateForm.controls;

      if (this.todoCreateForm.invalid) {
        Object.keys(controls).forEach((controlName) => controls[controlName].markAsTouched());

        return;
      }

      const createdTodoData = await this.createTodo(this.todoCreateForm.value);
      await this.createOrUpdateProject(createdTodoData);

      this.todoCreateForm.reset();
      this.closeForm();
      this.isSubmitted = false;
    }
  }

  createOrUpdateProject(createdTodoData: CreatedTodoData): Promise<void> {
    return new Promise((resolve) => {
      const { todo, project } = createdTodoData;
      const soughtProject = this.projects.find((existingProject) => existingProject.id === project.id);

      if (typeof soughtProject === 'undefined') {
        this.projects.push(plainToClass(Project, project).addTodo(todo));
      } else {
        soughtProject.todos.push(plainToClass(Todo, todo));
      }

      resolve();
    });
  }
}
