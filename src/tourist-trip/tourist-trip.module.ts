import { Module } from '@nestjs/common';
import { TouristTripService } from './tourist-trip.service';
import { TouristTripController } from './tourist-trip.controller';

@Module({
  controllers: [TouristTripController],
  providers: [TouristTripService],
})
export class TouristTripModule {}
