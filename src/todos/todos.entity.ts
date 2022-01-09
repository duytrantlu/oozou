import { BaseEntity } from '../shared/base.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { STATUS } from './enums/todos.enum';
import Subtask from 'src/subtasks/subtasks.entity';

@Entity({ name: 'todo' })
export default class Todo extends BaseEntity{
  @Column()
  title: string

  @Column({
    type: 'enum',
    enum: STATUS,
    default: STATUS.PENDING
  })
  status: STATUS;

  @OneToMany(() => Subtask, subtask => subtask.todo)
  subtasks: Subtask[];
}
