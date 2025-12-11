import { Injectable } from '@nestjs/common';
import { DestinationSeeder } from './destination.seeder';
import { TripSeeder } from './trip.seeder';
import { UserSeeder } from './user.seeder';
import { DataSource } from 'typeorm';
import { BookingSeeder } from './booking.seeder';

@Injectable()
export class MainSeeder {
  constructor(
    private readonly dataSource: DataSource,
    private readonly destinationSeeder: DestinationSeeder,
    private readonly tripSeeder: TripSeeder,
    private readonly userSeeder: UserSeeder,
    private readonly bookingSeeder: BookingSeeder,
  ) {}

  async run() {
    console.log('Dropping existing schema...');
    await this.dataSource.dropDatabase();

    console.log('Synchronizing database schema...');
    await this.dataSource.synchronize();

    console.log('--- Starting Database Seeding ---');
    await this.destinationSeeder.run(500);
    await this.tripSeeder.run(100);
    await this.userSeeder.run(100);
    await this.bookingSeeder.run(50);
    console.log('--- Database Seeding Completed Successfully ---');
  }
}
