import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User, UserRole } from '@/user/user.entity';
import { UserFactory } from '../factories/user.factory';
import bcrypt from 'bcrypt';

@Injectable()
export class UserSeeder {
  constructor(private readonly dataSource: DataSource) {}

  async run(TOURIST: number) {
    const hashed = bcrypt.hashSync('password', 10);
    const userRepository = this.dataSource.getRepository(User);
    await userRepository.save(
      UserFactory(hashed, UserRole.OWNER, 'owner@gmail.com'),
    );
    await userRepository.save(
      UserFactory(hashed, UserRole.EMPLOYEE, 'employee1@gmail.com'),
    );
    await userRepository.save(
      UserFactory(hashed, UserRole.TOURIST, 'tourist1@gmail.com'),
    );
    const tourists = Array.from({ length: TOURIST }, () => UserFactory(hashed));
    await userRepository.save(tourists);
    console.log(
      `✅ User Seeder: ${TOURIST + 1} tourists, 1 owner, and 1 employee created.`,
    );
  }
}
