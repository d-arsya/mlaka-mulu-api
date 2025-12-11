import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User, UserRole } from '@/user/user.entity';
import { UserFactory } from '../factories/user.factory';

@Injectable()
export class UserSeeder {
  constructor(private readonly dataSource: DataSource) {}

  async run() {
    const userRepository = this.dataSource.getRepository(User);
    await userRepository.save(UserFactory(UserRole.OWNER, 'owner@gmail.com'));
    await userRepository.save(
      UserFactory(UserRole.EMPLOYEE, 'employee1@gmail.com'),
    );
    await userRepository.save(
      UserFactory(UserRole.TOURIST, 'tourist1@gmail.com'),
    );
    const tourists = Array.from({ length: 5 }, () => UserFactory());
    await userRepository.save(tourists);
    console.log('✅ User Seeder: 6 tourists, 1 owner, and 1 employee created.');
  }
}
