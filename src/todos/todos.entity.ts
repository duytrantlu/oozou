import { BaseEntity } from '../shared/base.entity';
import { Entity, Column } from 'typeorm';
import { STATUS } from './enums/todos.enum';

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
}
