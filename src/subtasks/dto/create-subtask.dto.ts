import { IsDefined, IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { STATUS } from '../enums/subtasks.enum';

export default class CreateSubtaskDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    required: true
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  todoId: string;
}
