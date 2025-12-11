import { User, UserRole } from '@/user/user.entity';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

export const UserFactory = (
  role: UserRole = UserRole.TOURIST,
  email: string = 'email',
  password: string = 'password',
): User => {
  const hashed = bcrypt.hashSync(password, 10);
  const user = new User();
  user.name = faker.person.fullName();
  user.email = email == 'email' ? faker.internet.email() : email;
  user.phone = faker.phone.number({ style: 'international' });
  user.password = hashed;
  user.role = role;
  return user;
};
