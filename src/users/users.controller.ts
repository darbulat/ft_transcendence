import { Body, Controller, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from '../login/guards/authenticated.guard';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Patch(':id')
  // @UseGuards(AuthenticatedGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update({
      id: id,
      displayName: updateUserDto.displayName,
    });
  }
}
