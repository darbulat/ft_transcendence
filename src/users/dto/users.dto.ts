import { IsString } from '@nestjs/class-validator';

export class UsersDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
