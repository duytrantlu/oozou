import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TodosModule from 'src/todos/todos.module';
import { SubtasksController } from './subtasks.controller';
import Subtask from './subtasks.entity';
import SubtasksService from './subtasks.service';



@Module({
  imports: [
    TypeOrmModule.forFeature([Subtask]),
    forwardRef(() => TodosModule)
  ],
  controllers: [SubtasksController],
  providers: [SubtasksService],
  exports: [SubtasksService]
})
export default class SubtaskModule {}
