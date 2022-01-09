import { IsString, IsUUID } from 'class-validator';
// import {  } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateUserDto implements Readonly<CreateUserDto> {
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;


  @ApiProperty({ required: true })
  @IsString()
  firstName: string;

  @ApiProperty({ required: true })
  @IsString()
  lastName: string;

  @ApiProperty({ required: true })
  @IsString()
  email: string;

  public static from(dto: any) {
    const it = new CreateUserDto();
    it.id = dto.id;
    it.firstName = dto.firstName;
    it.lastName = dto.lastName;
    it.email = dto.email;
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
