import { createZodDto } from 'nestjs-zod';
import z from 'zod';
import { UserRole } from './user.entity';

const UserSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  password: z.string(),
  role: z.enum(UserRole).default(UserRole.TOURIST),
});
export class CreateUserDto extends createZodDto(UserSchema) {}
export class UpdateUserDto extends createZodDto(UserSchema.partial()) {}
