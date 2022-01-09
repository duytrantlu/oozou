import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithJsonApiDeserializedBody } from './json-api.interceptor';

export const JsonApiDeserializedBody = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request: RequestWithJsonApiDeserializedBody = ctx.switchToHttp().getRequest();
  return request.deserializedBody;
})
