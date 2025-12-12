import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { CaslModule } from '@/casl/casl.module';
import { Trip } from '@/trip/trip.entity';
import { TouristTrip } from '@/tourist-trip/tourist-trip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Trip, TouristTrip]), CaslModule],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
