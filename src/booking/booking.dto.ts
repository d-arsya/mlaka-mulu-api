import { createZodDto } from 'nestjs-zod';
import z from 'zod';
import { BookingStatus } from './booking.entity';

const BookingSchema = z.object({
  amount: z.number().positive().max(100),
  status: z.nativeEnum(BookingStatus).optional(),
  user: z.uuid(),
});
export class CreateBookingDto extends createZodDto(BookingSchema) {}
export class UpdateBookingDto extends createZodDto(BookingSchema.partial()) {}
