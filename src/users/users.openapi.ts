import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { ResourceObject, JsonApiResponseData, JsonApiRequestData, JsonApiRequest } from 'src/jsonapi.openapi';

abstract class UserAttributesObject {

  @ApiProperty()
  firstName!: string;

}

@ApiExtraModels(UserAttributesObject)
abstract class UserResourceObject extends ResourceObject {

  @ApiProperty({enum: ['users']})
  type!: string

  @ApiProperty({type: UserAttributesObject})
  attributes!: UserAttributesObject

}

@ApiExtraModels(UserResourceObject)
export abstract class GetUsersOkJsonApiResponse extends JsonApiResponseData {

  @ApiProperty({
    uniqueItems: true,
    description: 'An array of zero or more User resource objects',
    type: [UserResourceObject],
    oneOf: [
      {
        type: 'array',
        minItems: 0,
        default: [],
        items: {
          $ref: getSchemaPath(UserResourceObject)
        }
      }
    ]
  })
  data!: UserResourceObject[]

}

@ApiExtraModels(UserResourceObject)
export abstract class GetUserOkJsonApiResponse extends JsonApiResponseData {

  @ApiProperty({
    description: 'A User resource object',
    type: UserResourceObject,
    oneOf: [
      {
        $ref: getSchemaPath(UserResourceObject)
      }
    ]
  })
  data!: UserResourceObject

}

@ApiExtraModels(UserResourceObject)
export abstract class CreateUserCreatedJsonApiResponse extends JsonApiResponseData {

  @ApiProperty({
    description: 'A User resource object',
    type: UserResourceObject,
    oneOf: [
      {
        $ref: getSchemaPath(UserResourceObject)
      }
    ]
  })
  data!: UserResourceObject

}

@ApiExtraModels(UserResourceObject)
export abstract class UpdateUserOkJsonApiResponse extends JsonApiResponseData {

  @ApiProperty({
    description: 'A User resource object',
    type: UserResourceObject,
    oneOf: [
      {
        $ref: getSchemaPath(UserResourceObject)
      }
    ]
  })
  data!: UserResourceObject

}

@ApiExtraModels(UserAttributesObject)
export abstract class CreateUserRequestData extends JsonApiRequestData {

  @ApiProperty({enum: ['users']})
  type!: string

  @ApiProperty({type: UserAttributesObject})
  attributes!: UserAttributesObject

}

@ApiExtraModels(CreateUserRequestData)
export abstract class CreateUserRequestBody extends JsonApiRequest {

  @ApiProperty({type: CreateUserRequestData})
  data!: CreateUserRequestData

}

@ApiExtraModels(UserAttributesObject)
export abstract class UpdateUserRequestData extends JsonApiRequestData {

  @ApiProperty({enum: ['users']})
  type!: string

  @ApiProperty({type: UserAttributesObject})
  attributes!: UserAttributesObject

}

@ApiExtraModels(UpdateUserRequestData)
export abstract class UpdateUserRequestBody extends JsonApiRequest {

  @ApiProperty({type: UpdateUserRequestData})
  data!: UpdateUserRequestData

}
