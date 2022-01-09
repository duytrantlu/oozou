import { BaseEntity } from '../shared/base.entity';
import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { STATUS } from './enums/subtasks.enum';
import Todo from 'src/todos/todos.entity';

@Entity({ name: 'subtask' })
export default class Subtask extends BaseEntity{
  @Column()
  title: string

  @Column({
    type: 'enum',
    enum: STATUS,
    default: STATUS.PENDING
  })
  status: STATUS;

  @ManyToOne(() => Todo, (todo) => todo.subtasks)
  todo: Todo;
}
