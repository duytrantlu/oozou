import { STATUS } from "../enums/todos.enum";

export interface ICreateTodo {
  title: string;
  status: STATUS;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}