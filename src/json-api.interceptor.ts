import JSONAPISerializer, { RegisterOptions } from 'json-api-serializer';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { map } from 'rxjs/operators';
import { Request } from 'express';

export interface RequestWithJsonApiDeserializedBody extends Request {
  deserializedBody: any
}

@Injectable()
export default class UsersJsonApiAllInOneInterceptor implements NestInterceptor {

  private name!: string
  private options!: RegisterOptions
  private extraData!: any
  private cachedSerializer!: JSONAPISerializer

  constructor(private reflector: Reflector) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const handler = context.getHandler()
    const klass = context.getClass()
    const request: RequestWithJsonApiDeserializedBody = context.switchToHttp().getRequest();
    this.name = this.reflector.getAllAndOverride('jsonApiSerializerName', [handler, klass]);
    this.options = this.reflector.getAllAndOverride('jsonApiSerializerOptions', [handler, klass]);
    this.extraData = this.reflector.getAllAndOverride('jsonApiSerializerExtraData', [handler, klass]);
    const { body } = request;
    const hasBody = (Object.keys(body).length && body.constructor === Object);
    if (hasBody) {
      const deserializedBody = await this.serializer.deserializeAsync(this.name, body);
      request.deserializedBody = deserializedBody; // This 'feels' like middleware
    }
    return next.handle().pipe(
      map(async data => await this.serializer.serializeAsync(this.name, data, this.extraData(data, request)))
    );
  }

  private get serializer() {
    if (this.cachedSerializer) {
      this.cachedSerializer.register(this.name, this.options);
      return this.cachedSerializer;
    }
    this.cachedSerializer = new JSONAPISerializer();
    this.cachedSerializer.register(this.name, this.options);
    return this.cachedSerializer;
  }

}
