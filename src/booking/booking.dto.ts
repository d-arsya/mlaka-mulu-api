import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const BookingSchema = z.object({});
export class CreateBookingDto extends createZodDto(BookingSchema) {}
export class UpdateBookingDto extends createZodDto(BookingSchema.partial()) {}
