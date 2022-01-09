import { IsDefined, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { STATUS } from '../enums/subtasks.enum';

export default class CreateSubtaskDto {
  @ApiProperty({ required: false })
  @IsUUID()
  id: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ 
    required: true,
    enum: STATUS,
 })
  @IsString()
  @IsDefined()
  status: STATUS;

  @ApiProperty({
    required: true
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  todoId: string;

  // public static fromEntity(entity: Item) {
  //   return this.from({
  //     id: entity.id,
  //     name: entity.name,
  //     description: entity.description
  //   });
  // }

  // public toEntity(user: User = null) {
  //   const it = new Item();
  //   it.id = this.id;
  //   it.name = this.name;
  //   it.description = this.description;
  //   it.createDateTime = new Date();
  //   it.createdBy = user ? user.id : null;
  //   it.lastChangedBy = user ? user.id : null;
  //   return it;
  // }
}
