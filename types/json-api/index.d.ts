declare module 'JSONAPI' {

  interface JsonApiErrorSource {
    pointer?: string
    parameter?: string
  }

  interface JsonApiErrorLinks {
    about: string
  }

  interface JsonApiError {
    id?: string | number
    links?: JsonApiErrorLinks
    status?: string
    code?: string
    title?: string
    detail?: string
    source?: JsonApiErrorSource
    meta?: Record<string, any>
  }

  interface JsonApiLinkObject {
    href?: string
    meta?: Record<string, any>
  }

  interface JsonApiTopLevelLinks {
    self?: string
    related?: JsonApiLinkObject
  }

  interface JsonApiTopLevelJsonApi {
    version: string
  }

  interface JsonApiRelationshipLinks {
    self?: string
    related?: string
  }

  interface JsonApiResourceIdentifierObject {
    type: string
    id: string
  }

  interface JsonApiRelationshipsObject {
    links?: JsonApiRelationshipLinks
    data?: null | [] | JsonApiResourceIdentifierObject | JsonApiResourceIdentifierObject[]
    meta?: Record<string, any>
  }

  interface JsonApiResourceObject {
    id: string
    type: string
    attributes?: any
    relationships?: Record<string, JsonApiRelationshipsObject>
    links?: Record<string, string | JsonApiLinkObject>
    meta?: Record<string, any>
  }

  interface JsonApiResponse {
    meta?: Record<string, any>
    jsonapi?: JsonApiTopLevelJsonApi
    links?: JsonApiTopLevelLinks
    included?: JsonApiResourceObject[]
  }

  interface JsonApiResponseData<T> extends JsonApiResponse {
    data: T
  }

  interface JsonApiResponseError extends JsonApiResponse {
    errors: JsonApiError[]
  }

  interface JsonApiRequestData {
    type: string
    attributes: any
    relationships?: Record<string, JsonApiRelationshipsObject>
  }

  interface JsonApiRequest {
    data: JsonApiRequestData
  }

}
