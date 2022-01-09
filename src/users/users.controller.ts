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

import { JsonApiDeserializedBody } from 'src/json-api-deserialized-body.decorator';
import JsonApiSerializable from 'src/json-api-serializable.decorator';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import {
  GetUsersOkJsonApiResponse,
  GetUserOkJsonApiResponse,
  CreateUserCreatedJsonApiResponse,
  CreateUserRequestBody,
  UpdateUserOkJsonApiResponse,
  UpdateUserRequestBody
} from './users.openapi';
import { JsonApiResponseError } from 'src/jsonapi.openapi';
import { PinoLogger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import UsersService from './users.service';
import User from './user.entity';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
@ApiExtraModels(
  GetUsersOkJsonApiResponse,
  GetUserOkJsonApiResponse,
  JsonApiResponseError,
  CreateUserCreatedJsonApiResponse,
  CreateUserRequestBody,
  UpdateUserOkJsonApiResponse,
  UpdateUserRequestBody
)
@ApiProduces('application/vnd.api+json')
export class UsersController {

  constructor(
    private readonly logger: PinoLogger,
    // private readonly configService: ConfigService,
    private readonly usersService: UsersService
  ) {
    logger.setContext(UsersController.name);
  }

  @Get()
  @ApiOkResponse({
    description: 'OK',
    content: {
      'application/vnd.api+json': {
        schema: {
          $ref: getSchemaPath(GetUsersOkJsonApiResponse)
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
  @ApiOperation({
    summary: 'List all users',
    description: 'List all users',
    operationId: 'findAllUsers'
  })
  @JsonApiSerializable('users', {
    convertCase: 'camelCase',
    links: (data: any) => ({
      self: `/users/${data.id}`
    }),
    topLevelLinks: {
      self: '/users'
    }
  })
  async findAll(): Promise<User[]> {
    this.logger.info('UsersController#findAll');
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'OK',
    content: {
      'application/vnd.api+json': {
        schema: {
          $ref: getSchemaPath(GetUserOkJsonApiResponse)
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
  @ApiOperation({
    summary: 'Get a specific user',
    description: 'Get a specific user',
    operationId: 'findOneUser'
  })
  @JsonApiSerializable('users', {
    convertCase: 'camelCase',
    links: (data: any) => ({
      self: `/users/${data.id}`
    }),
    topLevelLinks: (data: any, extraData: unknown) => ({
      self: `/users/${data.id}`
    })
  })
  async findOne(@Param('id') id: number): Promise<User | undefined> {
    return this.usersService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Created',
    content: {
      'application/vnd.api+json': {
        schema: {
          $ref: getSchemaPath(CreateUserCreatedJsonApiResponse)
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
  @ApiBody({type: CreateUserRequestBody})
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Create a new user',
    operationId: 'createUser'
  })
  @JsonApiSerializable('users', {
    convertCase: 'camelCase',
    links: (data: any) => ({
      self: `/users/${data.id}`
    }),
    topLevelLinks: (data: any, extraData: unknown) => ({
      self: `/users/${data.id}`
    })
  })
  async create(@JsonApiDeserializedBody() body: CreateUserDto): Promise<any> {
    return { firstName: 'john' }
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'OK',
    content: {
      'application/vnd.api+json': {
        schema: {
          $ref: getSchemaPath(UpdateUserOkJsonApiResponse)
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
  @ApiBody({type: UpdateUserRequestBody})
  @ApiOperation({
    summary: 'Update an existing user',
    description: 'Update an existing user',
    operationId: 'updateUser'
  })
  @JsonApiSerializable('users', {
    convertCase: 'camelCase',
    links: (data: any) => ({
      self: `/users/${data.id}`
    }),
    topLevelLinks: (data: any, extraData: unknown) => ({
      self: `/users/${data.id}`
    })
  })
  async update(@Param('id') id: number, @JsonApiDeserializedBody() body: UpdateUserDto): Promise<any> {
    return { patched: id }
  }

  @Delete(':id')
  @ApiNoContentResponse({
    description: 'No Content'
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
  @ApiOperation({
    summary: 'Destroy an existing user',
    description: 'Destroy an existing user',
    operationId: 'destroyUser'
  })
  @JsonApiSerializable('users', {
    convertCase: 'camelCase',
    links: (data: any) => ({
      self: `/users/${data.id}`
    }),
    topLevelLinks: (data: any, extraData: unknown) => ({
      self: `/users/${data.id}`
    })
  })
  async destroy(@Param('id') id: number, @Res() res: Response): Promise<any> {
    return res.status(HttpStatus.NO_CONTENT).send()
  }

}
