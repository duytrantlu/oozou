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
import { CreateSubtaskCreatedJsonApiResponse, CreateSubtaskRequestBody } from './subtasks.openapi';
import CreateSubtaskDto from './dto/create-subtask.dto';
import SubtasksService from './subtasks.service';

@Controller('subtasks')
@ApiTags('Subtasks')
@ApiBearerAuth()
@ApiExtraModels(
  CreateSubtaskCreatedJsonApiResponse,
  JsonApiResponseError,
  CreateSubtaskRequestBody
)
@ApiProduces('application/vnd.api+json')
export class SubtasksController {

  constructor(
    private readonly subtasksService: SubtasksService
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Created',
    content: {
      'application/vnd.api+json': {
        schema: {
          $ref: getSchemaPath(CreateSubtaskCreatedJsonApiResponse)
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
  @ApiBody({type: CreateSubtaskRequestBody})
  @ApiOperation({
    summary: 'Create a new sub task',
    description: 'Create a new sub task',
    operationId: 'createSubtask'
  })
  @JsonApiSerializable('subtasks', {
    convertCase: 'camelCase',
    links: (data: any) => ({
      self: `/subtasks/${data.id}`
    }),
    topLevelLinks: (data: any, extraData: unknown) => ({
      self: `/subtasks/${data.id}`
    })
  })
  async create(@JsonApiDeserializedBody() body: CreateSubtaskDto): Promise<any> {
    return this.subtasksService.create(body);
  }

}
