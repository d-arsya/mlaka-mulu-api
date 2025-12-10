import { Module } from '@nestjs/common';
import { TouristTripService } from './tourist-trip.service';
import { TouristTripController } from './tourist-trip.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TouristTrip } from './tourist-trip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TouristTrip])],
  controllers: [TouristTripController],
  providers: [TouristTripService],
})
export class TouristTripModule {}
