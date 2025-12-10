import { Injectable } from '@nestjs/common';
import { DestinationSeeder } from './destination.seeder';
import { TripSeeder } from './trip.seeder';

@Injectable()
export class MainSeeder {
  constructor(
    private readonly destinationSeeder: DestinationSeeder,
    private readonly tripSeeder: TripSeeder,
  ) {}

  async run() {
    console.log('--- Starting Database Seeding ---');
    await this.destinationSeeder.run();
    await this.tripSeeder.run();
    console.log('--- Database Seeding Completed Successfully ---');
  }
}
