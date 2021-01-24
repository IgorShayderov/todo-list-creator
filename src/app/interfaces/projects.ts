export interface Project {
  id: number;
  title: string;
  todos: Todo[];
}

export interface Todo {
  id: number;
  text: string;
  is_completed: boolean;
}

export interface NewTodoData {
  categoryId: string;
  text: string;
}

export interface TodoChangeCompletenessData {
  categoryId: number;
  todoId: number;
}
