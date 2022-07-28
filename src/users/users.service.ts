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

  findOneByUsername(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username: username });
  }

  findOneById(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(username: string, intraId: number): Promise<User> {
    return await this.usersRepository.save({
      username: username,
      displayName: username,
      intraId: intraId,
      password: 'changeme',
    });
  }

  async update({ id: id, displayName: displayName }) {
    await this.usersRepository.update(id, { displayName: displayName });
    return this.findOneById(id);
  }

  async findOrCreate({ username: username, intraId: intraId }) {
    let user: User = await this.findOneByUsername(username);
    if (!user) {
      user = await this.create(username, intraId);
    }
    return user;
  }
}
