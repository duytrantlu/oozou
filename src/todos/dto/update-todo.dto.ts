import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { STATUS } from "../enums/todos.enum";


export default class UpdateTodoDto {
  @ApiProperty({
    required: true,
    description: "The status of the todo",
    enum: STATUS,
    type: String,
    default: STATUS.COMPLETED
  })
  @IsString()
  status: STATUS;
}
