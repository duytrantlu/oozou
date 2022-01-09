import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { STATUS } from '../enums/todos.enum';

export default class CreateTodoDto implements Readonly<CreateTodoDto> {
  @ApiProperty({ required: false })
  @IsUUID()
  id: string;

  @ApiProperty({ required: true })
  @IsString()
  title: string;

  @ApiProperty({ 
    required: true,
    enum: STATUS,
 })
  @IsString()
  status: STATUS;


  public static from(dto: CreateTodoDto) {
    const it = new CreateTodoDto();
    it.id = dto.id;
    it.title = dto.title;
    it.status = dto.status;
    return it;
  }

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
