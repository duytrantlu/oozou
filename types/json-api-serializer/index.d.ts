declare module 'json-api-serializer' {

  import { JsonApiRequest, JsonApiResponseData, JsonApiError, JsonApiResourceIdentifierObject, JsonApiResourceObject } from 'JSONAPI'

  interface GlobalOptions {
    convertCase?: Casings
    unconvertCase?: Casings
    convertCaseCacheSize?: number
    jsonapiObject?: boolean
  }

  interface LinksObject {
    [key: string]: string | ((...args: any[]) => any)
  }

  interface TopLevelMetaObject {
    [key: string]: string | ((...args: any[]) => any)
  }

  interface TopLevelLinksObject {
    [key: string]: string | ((...args: any[]) => any)
  }

  interface MetaObject {
    [key: string]: string | ((...args: any[]) => any)
  }

  interface RelationshipLinksObject {
    [key: string]: string | ((...args: any[]) => any)
  }

  interface RelationshipMetaObject {
    [key: string]: string | ((...args: any[]) => any)
  }

  type DataFunction = (data: any) => any

  type ExtraDataFunction = (extraData: any) => any

  type DataExtraDataFunction = (data: any, extraData: any) => any

  type Links = LinksObject | DataFunction | DataExtraDataFunction

  type TopLevelMeta = TopLevelMetaObject | ExtraDataFunction | DataExtraDataFunction

  type TopLevelLinks = TopLevelLinksObject | ExtraDataFunction | DataExtraDataFunction

  type Meta = MetaObject | DataFunction | DataExtraDataFunction

  type RelationshipFunction = (relationshipData: any, data: any) => any

  type RelationshipType = string | RelationshipFunction

  type RelationshipLinks = RelationshipLinksObject | DataFunction | DataExtraDataFunction

  type RelationshipMeta = RelationshipMetaObject | DataFunction | DataExtraDataFunction

  interface RelationshipOptions {
    type: RelationshipType
    alternativeKey?: string
    schema?: any
    links?: Relationships
    meta?: RelationshipMeta
    deserialize?: DataFunction
  }

  interface Relationships {
    [key: string]: RelationshipOptions
  }

  export interface RegisterOptions {
    // Serialization options
    id?: string
    blacklist?: string[]
    whitelist?: string[]
    jsonapiObject?: boolean
    links?: Links
    topLevelMeta?: TopLevelMeta
    topLevelLinks?: TopLevelLinks
    meta?: Meta
    relationships?: Relationships
    convertCase?: Casings
    beforeSerialize?: (data: any) => any

    // Deserialization options
    unconvertCase?: Casings
    blacklistOnDeserialize?: string[]
    whitelistOnDeserialize?: string[]
    afterDeserialize?: (data: any) => any
  }

  type Casings = 'kebab-case' | 'snake_case' | 'camelCase'

  export default class JSONAPISerializer {
    constructor(options?: GlobalOptions)
    register(type: string, options?: RegisterOptions): void
    serialize<T extends JsonApiResourceObject | JsonApiResourceIdentifierObject | JsonApiResourceObject[] | JsonApiResourceIdentifierObject[] | [] | null>(type: string, data: any, extraData?: any): JsonApiResponseData<T>
    serializeAsync<T extends JsonApiResourceObject | JsonApiResourceIdentifierObject | JsonApiResourceObject[] | JsonApiResourceIdentifierObject[] | [] | null>(type: string, data: any, extraData?: any): Promise<JsonApiResponseData<T>>
    deserialize(type: string, data: JsonApiRequest): Promise<any>
    deserializeAsync(type: string, data: JsonApiRequest): Promise<any>
    serializeError<T extends Error = any>(error: Error | Error[] | JsonApiError | JsonApiError[] | T): JsonApiError
    schemas: Record<string, any>
  }

}
