import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TypeORMError } from 'typeorm';
import { User, UserRole } from './user.entity';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
      const user = await this.userRepository.save(createUserDto);
      return await this.findOne(user.email);
    } catch (error) {
      if (error.code === '23505') {
        throw new TypeORMError(error.detail);
      }
      throw error;
    }
  }

  findByRole(role: UserRole): Promise<User[]> {
    return this.userRepository.find({
      where: { role },
      relations: ['bookings', 'trips'],
    });
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOneOrFail({
      where: { id },
      relations: ['bookings', 'trips'],
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneOrFail({
      where: { email },
      relations: ['bookings', 'trips'],
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneOrFail({
      where: { id },
      relations: ['bookings', 'trips'],
    });
    this.userRepository.merge(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.userRepository.findOneByOrFail({ id });
    return this.userRepository.remove(user);
  }
}
