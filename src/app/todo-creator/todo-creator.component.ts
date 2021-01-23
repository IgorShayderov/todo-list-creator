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
import { Project, NewTodoData } from '../interfaces/projects';

@Component({
  selector: 'app-todo-creator',
  templateUrl: './todo-creator.component.html',
  styleUrls: ['./todo-creator.component.scss']
})
export class TodoCreatorComponent implements OnInit {
  todoCreateForm!: FormGroup;

  @Input() projects: Project[] = [];
  @Input() shouldFormBeVisible = false;

  @Output() changeFormVisibilityFlag = new EventEmitter<boolean>();
  @Output() createNewTodoItem = new EventEmitter<NewTodoData>();

  constructor(private fb: FormBuilder) { }

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
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  closeForm(): void {
    this.changeFormVisibilityFlag.emit();
  }

  onReset(): void {
    this.closeForm();
  }

  onSubmit(): void {
    const controls = this.todoCreateForm.controls;

    if (this.todoCreateForm.invalid) {
      Object.keys(controls).forEach((controlName) => controls[controlName].markAsTouched());

      return;
    }

    this.createNewTodoItem.emit(this.todoCreateForm.value);
    this.todoCreateForm.reset();
    this.closeForm();
  }
}
