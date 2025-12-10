import { Destination } from '@/destination/destination.entity';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DestinationFactory } from '../factories/destination.factory';

@Injectable()
export class DestinationSeeder {
  constructor(private readonly dataSource: DataSource) {}

  async run() {
    const destinationRepository = this.dataSource.getRepository(Destination);
    const destinations = Array.from({ length: 50 }, () => DestinationFactory());
    await destinationRepository.save(destinations);
    console.log('✅ Destination Seeder: 50 destinations created.');
  }
}
