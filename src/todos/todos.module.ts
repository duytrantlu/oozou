import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import SubtaskModule from 'src/subtasks/subtasks.module';
import { TodosController } from './todos.controller';

import Todo from './todos.entity';
import TodosService from './todos.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Todo]),
    forwardRef(() => SubtaskModule)
  ],
  controllers: [TodosController],
  providers: [TodosService],
  exports: [TodosService]
})
export default class TodosModule {}
