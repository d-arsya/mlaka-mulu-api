import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TripFactory } from '../factories/trip.factory';
import { Trip } from '@/trip/trip.entity';
import { Destination } from '@/destination/destination.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class TripSeeder {
  constructor(private readonly dataSource: DataSource) {}

  async run(TRIP: number) {
    const tripRepository = this.dataSource.getRepository(Trip);
    const destinationRepository = this.dataSource.getRepository(Destination);
    const existingDestinations = await destinationRepository.find();

    if (existingDestinations.length === 0) {
      console.warn('⚠️ Trip Seeder: No destination found.');
      return;
    }
    const tripsToSave: Trip[] = [];
    for (let i = 0; i < TRIP; i++) {
      const trip = TripFactory();
      const selectedDestinations = this.getRandomSubset(
        existingDestinations,
        faker.number.int({ min: 1, max: 4 }),
      );

      trip.destinations = selectedDestinations;
      tripsToSave.push(trip);
    }
    await tripRepository.save(tripsToSave);
    console.log(`✅ Trip Seeder: ${TRIP} Trips (with Destinations) created.`);
  }
  private getRandomSubset<T>(array: T[], size: number): T[] {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, size);
  }
}
