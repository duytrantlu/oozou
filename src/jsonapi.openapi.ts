import {
  getSchemaPath,
  ApiExtraModels,
  ApiPropertyOptional,
  ApiProperty
} from '@nestjs/swagger'

abstract class ErrorSource {

  @ApiPropertyOptional()
  pointer?: string

  @ApiPropertyOptional()
  parameter?: string

}

abstract class ErrorLinks {

  @ApiProperty()
  about!: string

}

@ApiExtraModels(ErrorLinks, ErrorSource)
abstract class JsonApiError {

  @ApiPropertyOptional({
    oneOf: [
      {type: 'string'},
      {type: 'number'}
    ]
  })
  id?: string | number

  @ApiPropertyOptional()
  links?: ErrorLinks

  @ApiPropertyOptional()
  status?: string

  @ApiPropertyOptional()
  code?: string

  @ApiPropertyOptional()
  title?: string

  @ApiPropertyOptional()
  detail?: string

  @ApiPropertyOptional()
  source?: ErrorSource

  @ApiPropertyOptional()
  meta?: Record<string, any>

}

abstract class LinkObject {

  @ApiPropertyOptional()
  href?: string

  @ApiPropertyOptional()
  meta?: Record<string, any>

}

@ApiExtraModels(LinkObject)
abstract class TopLevelLinks {

  @ApiPropertyOptional()
  self?: string

  @ApiPropertyOptional()
  related?: LinkObject

}

abstract class TopLevelJsonApi {

  @ApiProperty()
  version!: string

}

abstract class RelationshipLinks {

  @ApiPropertyOptional()
  self?: string

  @ApiPropertyOptional()
  related?: string

}

abstract class ResourceIdentifierObject {

  @ApiProperty()
  type!: string

  @ApiProperty()
  id!: string
}

@ApiExtraModels(ResourceIdentifierObject, RelationshipLinks)
export abstract class RelationshipsObject {

  @ApiPropertyOptional()
  links?: RelationshipLinks

  @ApiPropertyOptional({
    nullable: true,
    oneOf: [
      {
        $ref: getSchemaPath(ResourceIdentifierObject)
      },
      {
        type: 'array',
        default: [],
        items: {
          $ref: getSchemaPath(ResourceIdentifierObject)
        }
      },
    ]
  })
  data?: null | [] | ResourceIdentifierObject | ResourceIdentifierObject[]

  @ApiPropertyOptional()
  meta?: Record<string, any>

}

@ApiExtraModels(RelationshipsObject)
export abstract class ResourceObject {

  @ApiProperty()
  id!: string

  @ApiProperty()
  type!: string

  @ApiPropertyOptional()
  attributes?: any

  @ApiPropertyOptional()
  relationships?: Record<string, RelationshipsObject>

  @ApiPropertyOptional()
  links?: Record<string, string | LinkObject>

  @ApiPropertyOptional()
  meta?: Record<string, any>

}

@ApiExtraModels(TopLevelJsonApi, TopLevelLinks)
abstract class JsonApiResponse {

  @ApiPropertyOptional()
  meta?: Record<string, any>

  @ApiPropertyOptional()
  jsonapi?: TopLevelJsonApi

  @ApiPropertyOptional()
  links?: TopLevelLinks

  @ApiPropertyOptional({type: [ResourceObject]})
  included?: ResourceObject[]

}

@ApiExtraModels(ResourceObject, ResourceIdentifierObject)
export abstract class JsonApiResponseData extends JsonApiResponse {

  @ApiProperty({
    nullable: true,
    oneOf: [
      {
        $ref: getSchemaPath(ResourceObject)
      },
      {
        $ref: getSchemaPath(ResourceIdentifierObject)
      },
      {
        type: 'array',
        default: [],
        items: {
          $ref: getSchemaPath(ResourceObject)
        }
      },
      {
        type: 'array',
        default: [],
        items: {
          $ref: getSchemaPath(ResourceIdentifierObject)
        }
      }
    ]
  })
  data!: ResourceObject | ResourceIdentifierObject | null | ResourceObject[] | ResourceIdentifierObject[] | []

}

@ApiExtraModels(JsonApiError)
export abstract class JsonApiResponseError extends JsonApiResponse {

  @ApiProperty({type: [JsonApiError]})
  errors!: JsonApiError[]

}

@ApiExtraModels(RelationshipsObject)
export abstract class JsonApiRequestData {

  @ApiProperty()
  type!: string

  @ApiProperty()
  attributes!: any

  @ApiPropertyOptional()
  relationships?: Record<string, RelationshipsObject>

}

@ApiExtraModels(JsonApiRequestData)
export abstract class JsonApiRequest {

  @ApiProperty()
  data!: JsonApiRequestData

}
