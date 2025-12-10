import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const TripSchema = z.object({
  name: z.string().min(1),
  startDate: z
    .string()
    .datetime()
    .transform((val) => new Date(val)),

  endDate: z
    .string()
    .datetime()
    .transform((val) => new Date(val)),
  price: z.number().int().nonnegative().max(10000000),
  quota: z.number().int().positive().max(1000),
  booked: z.number().int().optional(),
  destinations: z.array(z.uuid()),
});
export class CreateTripDto extends createZodDto(TripSchema) {}
export class UpdateTripDto extends createZodDto(TripSchema.partial()) {}
