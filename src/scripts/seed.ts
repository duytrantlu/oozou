// scripts/seed.ts
import * as _ from 'lodash';
import { createConnection, ConnectionOptions } from 'typeorm';
import configuration from '../config/configuration';
import User from '../users/user.entity';
import UsersService from '../users/users.service';
import { PinoLogger } from 'nestjs-pino';
import CreateUserDto from '../users/dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';


async function run() {
  const opt = {
    type: 'postgres',
    host: configuration().database.postgres.host,
    port: configuration().database.postgres.port,
    username: configuration().database.postgres.username,
    password: configuration().database.postgres.password,
    database: configuration().database.postgres.name,
    entities: ['**/*.entity{.ts,.js}'],
    synchronize: true,
    migrations: [configuration().database.postgres.migrations],
    migrationsTableName: configuration().database.postgres.migrationsTableName,
    cli: {
      migrationsDir: configuration().database.postgres.migrationsDir
    },
    debug: true
  };

  const connection = await createConnection(opt as ConnectionOptions);
  const logger: PinoLogger = new PinoLogger({});
  const userService = new UsersService(logger, connection.getRepository(User));

  const existedUsers = await userService.findAll();
  if (!existedUsers?.length) {
    const work = _.range(1, 10)
      .map(n => CreateUserDto.from({
        id: uuidv4(),
        firstName: 'created from seed' + n,
        lastName: 'seed' + n,
        email: 'seed@example.com'
      }))
      .map(dto => userService.create(dto)
        .then(r => (console.log('done ->', r.name), r)))

    return await Promise.all(work);
  }
  return 'already seeded';
}

run()
  .then(_ => console.log('...wait for script to exit'))
  .catch(error => console.error('seed error', error));