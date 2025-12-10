import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const UserSchema = z.object({});
export class CreateUserDto extends createZodDto(UserSchema) {}
export class UpdateUserDto extends createZodDto(UserSchema.partial()) {}
