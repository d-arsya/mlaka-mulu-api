import { Module } from '@nestjs/common';
import { DestinationSeeder } from './destination.seeder';
import { MainSeeder } from './database.seeder';
import { TripSeeder } from './trip.seeder';

@Module({
  providers: [MainSeeder, DestinationSeeder, TripSeeder],
  exports: [MainSeeder],
})
export class SeederModule {}
