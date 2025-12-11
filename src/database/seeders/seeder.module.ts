import { Module } from '@nestjs/common';
import { DestinationSeeder } from './destination.seeder';
import { MainSeeder } from './database.seeder';
import { TripSeeder } from './trip.seeder';
import { UserSeeder } from './user.seeder';
import { BookingSeeder } from './booking.seeder';

@Module({
  providers: [
    MainSeeder,
    DestinationSeeder,
    TripSeeder,
    UserSeeder,
    BookingSeeder,
  ],
  exports: [MainSeeder],
})
export class SeederModule {}
