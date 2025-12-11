import { Module } from '@nestjs/common';
import { DestinationSeeder } from './destination.seeder';
import { MainSeeder } from './database.seeder';
import { TripSeeder } from './trip.seeder';
import { UserSeeder } from './user.seeder';

@Module({
  providers: [MainSeeder, DestinationSeeder, TripSeeder, UserSeeder],
  exports: [MainSeeder],
})
export class SeederModule {}
