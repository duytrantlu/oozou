import { SetMetadata, applyDecorators, UseInterceptors } from '@nestjs/common';
import { RegisterOptions } from 'json-api-serializer';
import { Request } from 'express';

import JsonApiInterceptor from './json-api.interceptor';

export default (serializerName: string, serializerOptions: RegisterOptions = {}, extraData: (data: any, request: Request) => any = () => ({})) => { // TODO:
  return applyDecorators(
    SetMetadata('jsonApiSerializerName', serializerName),
    SetMetadata('jsonApiSerializerOptions', serializerOptions),
    SetMetadata('jsonApiSerializerExtraData', extraData),
    UseInterceptors(JsonApiInterceptor)
  );
}
