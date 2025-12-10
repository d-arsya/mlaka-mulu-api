import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const DestionationSchema = z.object({
  name: z.string(),
  description: z.string(),
});
export class CreateDestinationDto extends createZodDto(DestionationSchema) {}
export class UpdateDestinationDto extends createZodDto(
  DestionationSchema.partial(),
) {}
