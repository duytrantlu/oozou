import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { PinoLogger } from 'nestjs-pino';
import Todo from './todos.entity';
import { ICreateTodo, IUpdateStatusTodo } from './interfaces/todos.interface';
import JSONAPISerializer from 'json-api-serializer';
import { STATUS } from './enums/todos.enum';
import { subtaskSerializerOptions, todoSerializerOptions } from './todos.register.serializer';
import SubtasksService from '../subtasks/subtasks.service';

@Injectable()
export default class TodosService {
  private readonly serializer: JSONAPISerializer;
  constructor(
    private readonly logger: PinoLogger,
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
    @Inject(forwardRef(() => SubtasksService)) private readonly subtaskService: SubtasksService,
  ) {
    this.serializer = new JSONAPISerializer();
    this.serializer.register('todos', todoSerializerOptions);
    this.serializer.register('subtasks', subtaskSerializerOptions);
  }

  async findAll(): Promise<any> {
    const todos = await this.todoRepository.find({ relations: ['subtasks'] });
    return this.serializer.serialize('todos', todos);
  }

  findById(id: string): Promise<Todo | undefined> {
    return this.todoRepository.findOne(id);
  }

  create(task: ICreateTodo): Promise<Todo> {
    task.id = uuidv4();
    task.status = STATUS.PENDING;
    task.createdAt = new Date();
    task.createdAt = new Date();
    return this.todoRepository.save(task);
  }

  async update(id: string, task: IUpdateStatusTodo): Promise<Todo> {
    const todo = await this.todoRepository.findOne(id);
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    const todoAfterUpdated = await this.todoRepository.save({
      id,
      status: task.status,
    });
    if (todoAfterUpdated.status === STATUS.COMPLETED) {
      await this.subtaskService.makeDoneAllSubtask(id);
    }
    return todoAfterUpdated;
  }
}
