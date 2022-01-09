import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Res,
  HttpStatus
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiExtraModels,
  getSchemaPath,
  ApiCreatedResponse,
  ApiBody,
  ApiConsumes,
  ApiProduces,
  ApiNoContentResponse
} from '@nestjs/swagger';
import { Response } from 'express';

import { JsonApiResponseError } from 'src/jsonapi.openapi';
import JsonApiSerializable from 'src/json-api-serializable.decorator';
import { JsonApiDeserializedBody } from 'src/json-api-deserialized-body.decorator';
import { PinoLogger } from 'nestjs-pino';
import TodosService from './todos.service';
import { CreateTodoRequestBody, CreateTodoTaskCreatedJsonApiResponse } from './todos.openapi';
import CreateTodoDto from './dto/create-todo.dto';
import Todo from './todos.entity';

@Controller('todos')
@ApiTags('Todos')
@ApiBearerAuth()
@ApiExtraModels(
  CreateTodoTaskCreatedJsonApiResponse,
  JsonApiResponseError,
  CreateTodoRequestBody
)
@ApiProduces('application/vnd.api+json')
export class TodosController {

  constructor(
    private readonly logger: PinoLogger,
    private readonly todosService: TodosService
  ) {
    logger.setContext(TodosController.name);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Created',
    content: {
      'application/vnd.api+json': {
        schema: {
          $ref: getSchemaPath(CreateTodoTaskCreatedJsonApiResponse)
        }
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    content: {
      'application/vnd.api+json': {
        schema: {
          $ref: getSchemaPath(JsonApiResponseError)
        }
      }
    }
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    headers: {
      'WWW-Authenticate': {
        description: 'Indicates the authentication scheme(s) and parameters applicable to the target resource.',
        schema: {
          type: 'string',
          enum: ['bearer']
        }
      }
    },
    content: {
      'application/vnd.api+json': {
        schema: {
          $ref: getSchemaPath(JsonApiResponseError)
        }
      }
    }
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
    content: {
      'application/vnd.api+json': {
        schema: {
          $ref: getSchemaPath(JsonApiResponseError)
        }
      }
    }
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    content: {
      'application/vnd.api+json': {
        schema: {
          $ref: getSchemaPath(JsonApiResponseError)
        }
      }
    }
  })
  @ApiConsumes('application/vnd.api+json')
  @ApiBody({type: CreateTodoRequestBody})
  @ApiOperation({
    summary: 'Create a new todo task',
    description: 'Create a new todo task',
    operationId: 'createTodoTask'
  })
  @JsonApiSerializable('todos', {
    convertCase: 'camelCase',
    links: (data: any) => ({
      self: `/todos/${data.id}`
    }),
    topLevelLinks: (data: any, extraData: unknown) => ({
      self: `/todos/${data.id}`
    })
  })
  async create(@JsonApiDeserializedBody() body: CreateTodoDto): Promise<any> {
    return this.todosService.create(body);
  }

}
