import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import User from './user.entity';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export default class UsersService {

  constructor(
    private readonly logger: PinoLogger,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  findAll(): Promise<User[]> {
    this.logger.info('UsersService#findAll');
    return this.userRepository.find();
  }

  findById(id: number): Promise<User | undefined> {
    this.logger.info('UsersService#findById');
    return this.userRepository.findOne(id);
  }

  create(user: User): Promise<any> {
    this.logger.info('UsersService#create');
    return this.userRepository.save(user);
  }

}
