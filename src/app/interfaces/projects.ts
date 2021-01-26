import { Project } from '../models/project.class';
import { Todo } from '../models/todo.class';

export interface NewTodoData {
  categoryId: string;
  text: string;
  newCategoryTitle?: string;
}

export interface TodoChangeCompletenessData {
  categoryId: number;
  todoId: number;
}

export interface CreatedTodoData {
  todo: Todo;
  project: Project;
}
