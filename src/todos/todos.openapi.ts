import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { ResourceObject, JsonApiResponseData, JsonApiRequestData, JsonApiRequest } from 'src/jsonapi.openapi';
import { STATUS } from './enums/todos.enum';

abstract class TodoAttributesObject {

  @ApiProperty()
  title: string;

  @ApiProperty({
    enum: STATUS,
  })
  status: STATUS;

  @ApiProperty()
  createdAt!: Date;
}

@ApiExtraModels(TodoAttributesObject)
abstract class TodoResourceObject extends ResourceObject {

  @ApiProperty({enum: ['todos']})
  type!: string

  @ApiProperty({type: TodoAttributesObject})
  attributes!: TodoAttributesObject

}


@ApiExtraModels(TodoResourceObject)
export abstract class CreateTodoTaskCreatedJsonApiResponse extends JsonApiResponseData {

  @ApiProperty({
    description: 'A Todo resource object',
    type: TodoResourceObject,
    oneOf: [
      {
        $ref: getSchemaPath(TodoResourceObject)
      }
    ]
  })
  data!: TodoResourceObject

}

@ApiExtraModels(TodoAttributesObject)
export abstract class CreateTodoRequestData extends JsonApiRequestData {

  @ApiProperty({enum: ['todos']})
  type!: string

  @ApiProperty({type: TodoAttributesObject})
  attributes!: TodoAttributesObject

}

@ApiExtraModels(CreateTodoRequestData)
export abstract class CreateTodoRequestBody extends JsonApiRequest {

  @ApiProperty({type: CreateTodoRequestData})
  data!: CreateTodoRequestData

}