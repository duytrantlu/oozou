import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import configuration from './config/configuration';
import UsersModule from './users/users.module';
import TodosModule from './todos/todos.module';
import SubtaskModule from './subtasks/subtasks.module';
import { APP_FILTER } from '@nestjs/core';
import { AnyExceptionFilter } from './filters/any-exception.filter';

@Module({
  imports: [
    UsersModule,
    TodosModule,
    SubtaskModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
    }),
    LoggerModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log(configService.get('database.postgres'));
        return {
          type: 'postgres',
          host: configService.get('database.postgres.host'),
          port: configService.get('database.postgres.port'),
          username: configService.get('database.postgres.username'),
          password: configService.get('database.postgres.password'),
          database: configService.get('database.postgres.name'),
          entities: [configService.get('database.postgres.entities')],
          autoLoadEntities: true,
          synchronize: true,
          migrations: [configService.get('database.postgres.migrations')],
          migrationsTableName: configService.get('database.postgres.migrationsTableName'),
          cli: {
            migrationsDir: configService.get('database.postgres.migrationsDir')
          }
        } as any;
      }
    })
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AnyExceptionFilter
    }
  ]
})
export class AppModule {}
