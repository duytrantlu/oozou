import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import JSONAPISerializer from 'json-api-serializer';

@Catch()
export class AnyExceptionFilter<T> implements ExceptionFilter {
  constructor(@InjectPinoLogger(AnyExceptionFilter.name) private readonly logger: PinoLogger) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException ? exception.message : 'Internal Server Error';
    const detail = exception?.response?.message || 'Exception Error';
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error({err: exception}, 'Caught exception');
    }
    const Serializer = new JSONAPISerializer();
    
    response.status(status).json(
      Serializer.serializeError({
        status,
        title: message,
        detail,
        links: {
          about: request.url
        },
        meta: {
          time: new Date().toISOString(),
        }
      } as any));
  }
}
