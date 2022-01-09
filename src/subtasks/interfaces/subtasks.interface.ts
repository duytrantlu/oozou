import { STATUS } from "../enums/subtasks.enum";

export interface ICreateSubtask {
  title: string;
  status?: STATUS;
  id?: string;
  todoId: string;
  createdAt?: Date;
  updatedAt?: Date;
}