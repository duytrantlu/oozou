import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { type } from 'os';
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

abstract class TodoCreateBodyAttributesObject {

  @ApiProperty()
  title: string;
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

@ApiExtraModels(TodoCreateBodyAttributesObject)
export abstract class CreateTodoRequestData extends JsonApiRequestData {

  @ApiProperty({enum: ['todos']})
  type!: string

  @ApiProperty({type: TodoCreateBodyAttributesObject})
  attributes!: TodoCreateBodyAttributesObject

}

@ApiExtraModels(CreateTodoRequestData)
export abstract class CreateTodoRequestBody extends JsonApiRequest {

  @ApiProperty({type: CreateTodoRequestData})
  data!: CreateTodoRequestData
}

@ApiExtraModels(TodoResourceObject)
export abstract class GetTodosOkJsonApiResponse extends JsonApiResponseData {

  @ApiProperty({
    uniqueItems: true,
    description: 'An array of zero or more Todo resource objects',
    type: [TodoResourceObject],
    oneOf: [
      {
        type: 'array',
        minItems: 0,
        default: [],
        items: {
          $ref: getSchemaPath(TodoResourceObject)
        }
      }
    ]
  })
  data!: TodoResourceObject[]

}

@ApiExtraModels(TodoResourceObject)
export abstract class UpdateTodoOkJsonApiResponse extends JsonApiResponseData {

  @ApiProperty({
    description: 'A User resource object',
    type: TodoResourceObject,
    oneOf: [
      {
        $ref: getSchemaPath(TodoResourceObject)
      }
    ]
  })
  data!: TodoResourceObject

}

abstract class TodoStatusAttributesObject {

  @ApiProperty({
    type: String,
    enum: Object.keys(STATUS),
    default: STATUS.COMPLETED
  })
  status: STATUS;
}


@ApiExtraModels(TodoStatusAttributesObject)
export abstract class UpdateTodoRequestData extends JsonApiRequestData {

  @ApiProperty({enum: ['todos']})
  type!: string

  @ApiProperty({type: TodoStatusAttributesObject})
  attributes!: TodoStatusAttributesObject

}

@ApiExtraModels(UpdateTodoRequestData)
export abstract class UpdateTodoRequestBody extends JsonApiRequest {

  @ApiProperty({type: UpdateTodoRequestData})
  data!: UpdateTodoRequestData

}