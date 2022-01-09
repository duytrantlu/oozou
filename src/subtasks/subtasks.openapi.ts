import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { ResourceObject, JsonApiResponseData, JsonApiRequestData, JsonApiRequest } from 'src/jsonapi.openapi';
import { STATUS } from './enums/subtasks.enum';

abstract class SubtaskAttributesObject {

  @ApiProperty()
  title: string;

  @ApiProperty({
    enum: STATUS,
  })
  status: STATUS;

  @ApiProperty({
    required: true
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  todoId!: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}

@ApiExtraModels(SubtaskAttributesObject)
abstract class SubtaskResourceObject extends ResourceObject {

  @ApiProperty({enum: ['subtasks']})
  type!: string

  @ApiProperty({type: SubtaskAttributesObject})
  attributes!: SubtaskAttributesObject

}


@ApiExtraModels(SubtaskResourceObject)
export abstract class CreateSubtaskCreatedJsonApiResponse extends JsonApiResponseData {

  @ApiProperty({
    description: 'A Subtask resource object',
    type: SubtaskResourceObject,
    oneOf: [
      {
        $ref: getSchemaPath(SubtaskResourceObject)
      }
    ]
  })
  data!: SubtaskResourceObject

}

@ApiExtraModels(SubtaskAttributesObject)
export abstract class CreateSubtaskRequestData extends JsonApiRequestData {

  @ApiProperty({enum: ['subtasks']})
  type!: string

  @ApiProperty({type: SubtaskAttributesObject})
  attributes!: SubtaskAttributesObject

}

@ApiExtraModels(CreateSubtaskRequestData)
export abstract class CreateSubtaskRequestBody extends JsonApiRequest {

  @ApiProperty({type: CreateSubtaskRequestData})
  data!: CreateSubtaskRequestData

}