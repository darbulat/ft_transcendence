import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/users.model';

export const getPostgresConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  return {
    type: 'postgres',
    entities: [User],
    synchronize: true,
    url: getPostgresConnectionString(configService),
  };
};

const getPostgresConnectionString = (configService: ConfigService): string =>
  'postgresql://' +
  configService.get('DB_USER') +
  ':' +
  configService.get('DB_PASS') +
  '@' +
  configService.get('DB_HOST') +
  ':' +
  configService.get('DB_PORT') +
  '/' +
  configService.get('DB_SCHEMA');
