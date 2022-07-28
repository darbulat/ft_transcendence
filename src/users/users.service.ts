import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(username: string): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.usersRepository.findOneBy({ username: username });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(username: string, intraId: number): Promise<User> {
    return await this.usersRepository.save({
      username: username,
      intraId: intraId,
      password: 'changeme',
    });
  }
  async findOrCreate({ username: username, intraId: intraId }) {
    let user: User = await this.findOne(username);
    if (!user) {
      user = await this.create(username, intraId);
    }
    return user;
  }
}
