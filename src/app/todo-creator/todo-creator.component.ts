import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import {
  Project,
  Todo,
  NewTodoData
} from '../interfaces/projects';
import { ProjectsService } from '../projects.service';

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
  @Output() createNewTodoItem = new EventEmitter<Todo>();

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
        Validators.min(0),
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

  createTodo(newTodoParams: NewTodoData): Promise<Todo> {
    return new Promise((resolve) => {
      this.projectsService.createTodo(newTodoParams)
      .subscribe((newTodo) => resolve(newTodo));
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

      const newTodo = await this.createTodo(this.todoCreateForm.value);

      this.createNewTodoItem.emit(newTodo);
      this.todoCreateForm.reset();
      this.closeForm();
      this.isSubmitted = false;
    }
  }
}
