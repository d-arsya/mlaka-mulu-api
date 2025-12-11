import { User, UserRole } from '@/user/user.entity';
import { faker } from '@faker-js/faker';

export const UserFactory = (
  password: string,
  role: UserRole = UserRole.TOURIST,
  email: string = 'email',
): User => {
  const user = new User();
  user.name = faker.person.fullName();
  user.email = email == 'email' ? faker.internet.email() : email;
  user.phone = faker.phone.number({ style: 'international' });
  user.password = password;
  user.role = role;
  return user;
};
