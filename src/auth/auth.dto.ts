import { createZodDto } from 'nestjs-zod';
import z from 'zod';
export class LoginDto extends createZodDto(
  z.object({
    email: z.string(),
    password: z.string(),
  }),
) {}
