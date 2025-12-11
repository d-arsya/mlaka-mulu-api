import { Injectable } from '@nestjs/common';
import { DestinationSeeder } from './destination.seeder';
import { TripSeeder } from './trip.seeder';
import { UserSeeder } from './user.seeder';
import { DataSource } from 'typeorm';

@Injectable()
export class MainSeeder {
  constructor(
    private readonly dataSource: DataSource,
    private readonly destinationSeeder: DestinationSeeder,
    private readonly tripSeeder: TripSeeder,
    private readonly userSeeder: UserSeeder,
  ) {}

  async run() {
    console.log('Dropping existing schema...');
    await this.dataSource.dropDatabase();

    console.log('Synchronizing database schema...');
    await this.dataSource.synchronize();

    console.log('--- Starting Database Seeding ---');
    await this.destinationSeeder.run();
    await this.tripSeeder.run();
    await this.userSeeder.run();
    console.log('--- Database Seeding Completed Successfully ---');
  }
}
