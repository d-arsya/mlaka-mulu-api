import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const TripSchema = z.object({});
export class CreateTripDto extends createZodDto(TripSchema) {}
export class UpdateTripDto extends createZodDto(TripSchema.partial()) {}
