import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const TouristTripSchema = z.object({});
export class CreateTouristTripDto extends createZodDto(TouristTripSchema) {}
export class UpdateTouristTripDto extends createZodDto(
  TouristTripSchema.partial(),
) {}
