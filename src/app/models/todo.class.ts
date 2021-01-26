export class Todo {
  constructor() {}

  public id!: number;
  public text!: string;
  public is_completed!: boolean;

  changeCompleteness(): void {
    this.is_completed = !this.is_completed;
  }
}
