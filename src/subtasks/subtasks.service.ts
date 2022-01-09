import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { PinoLogger } from 'nestjs-pino';
import { ICreateSubtask } from './interfaces/subtasks.interface';
import Subtask from './subtasks.entity';
import TodosService from '../todos/todos.service';


@Injectable()
export default class SubtasksService {

  constructor(
    private readonly logger: PinoLogger,
    @InjectRepository(Subtask) private subtaskRepository: Repository<Subtask>,
    private readonly todoService: TodosService
  ) {}

  // findAll(): Promise<User[]> {
  //   this.logger.info('UsersService#findAll');
  //   return this.userRepository.find();
  // }

  // findById(id: number): Promise<User | undefined> {
  //   this.logger.info('UsersService#findById');
  //   return this.userRepository.findOne(id);
  // }

  async create(task: ICreateSubtask): Promise<Subtask> {
    task.id = uuidv4();
    task.createdAt = new Date();
    task.createdAt = new Date();
    const {todoId} = task;
    if (!todoId) {
      throw new BadRequestException('todoId is required');
    }
    const todo = await this.todoService.findById(todoId);
    if (!todo) {
      throw new BadRequestException('The todo is not existed');
    }
    return this.subtaskRepository.save(task);
  }

}
