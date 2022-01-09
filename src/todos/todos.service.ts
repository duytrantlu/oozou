import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { PinoLogger } from 'nestjs-pino';
import Todo from './todos.entity';
import { ICreateTodo } from './interfaces/todos.interface';


@Injectable()
export default class TodosService {

  constructor(
    private readonly logger: PinoLogger,
    @InjectRepository(Todo) private todoRepository: Repository<Todo>
  ) {}

  // findAll(): Promise<User[]> {
  //   this.logger.info('UsersService#findAll');
  //   return this.userRepository.find();
  // }

  findById(id: string): Promise<Todo | undefined> {
    return this.todoRepository.findOne(id);
  }

  create(task: ICreateTodo): Promise<Todo> {
    task.id = uuidv4();
    task.createdAt = new Date();
    task.createdAt = new Date();
    return this.todoRepository.save(task);
  }

}
