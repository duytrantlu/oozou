import configuration from '../config/configuration';
import fs = require('fs');

fs.writeFileSync('ormconfig.json',
 JSON.stringify({
  type: 'postgres',
  host: configuration().database.postgres.host,
  port: configuration().database.postgres.port,
  username: configuration().database.postgres.username,
  password: configuration().database.postgres.password,
  database: configuration().database.postgres.name,
  entities: [configuration().database.postgres.entities],
  // autoLoadEntities: true,
  synchronize: true,
  migrations: [configuration().database.postgres.migrations],
  migrationsTableName: configuration().database.postgres.migrationsTableName,
  cli: {
    migrationsDir: configuration().database.postgres.migrationsDir
  }
}, null, 2)
);

