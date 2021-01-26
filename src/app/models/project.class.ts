import { Todo } from './todo.class';
import { Type } from 'class-transformer';

export class Project {
  constructor() {}

  public id!: number;
  public title!: string;
  @Type(() => Todo)
  public todos: Todo[] = [];

  addTodo(todo: Todo): Project {
    this.todos.push(todo);

    return this;
  }

}
