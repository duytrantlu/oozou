import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { PinoLogger } from 'nestjs-pino';
import { ICreateSubtask } from './interfaces/subtasks.interface';
import Subtask from './subtasks.entity';
import TodosService from '../todos/todos.service';
import { STATUS } from './enums/subtasks.enum';


@Injectable()
export default class SubtasksService {

  constructor(
    private readonly logger: PinoLogger,
    @InjectRepository(Subtask) private subtaskRepository: Repository<Subtask>,
    @Inject(forwardRef(() => TodosService)) private readonly todoService: TodosService,
  ) {}

  async create(task: ICreateSubtask): Promise<Subtask> {
    task.id = uuidv4();
    task.status = STATUS.PENDING;
    task.createdAt = new Date();
    task.createdAt = new Date();
    const {todoId} = task;
    const todo = await this.todoService.findById(todoId);
    if (!todo) {
      throw new BadRequestException('The todo is not existed');
    }
    return this.subtaskRepository.save({
      ...task,
      todo,
    });
  }

  async makeDoneAllSubtask(id: string): Promise<Subtask> {
    const subtasks = await this.subtaskRepository.find({
      where: { 'todo.id': id },
    });
    console.log("===subtasks==", subtasks);
    const subtasksAfterUpdated = await this.subtaskRepository.save(subtasks.map(subtask => ({
      ...subtask,
      status: STATUS.COMPLETED,
    })));
    return subtasksAfterUpdated[0];
  }

}
