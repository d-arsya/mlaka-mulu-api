import { Module } from '@nestjs/common';
import { TripService } from './trip.service';
import { TripController } from './trip.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from './trip.entity';
import { Destination } from '@/destination/destination.entity';
import { CaslModule } from '@/casl/casl.module';

@Module({
  imports: [TypeOrmModule.forFeature([Trip, Destination]), CaslModule],
  controllers: [TripController],
  providers: [TripService],
})
export class TripModule {}
