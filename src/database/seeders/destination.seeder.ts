import { Destination } from '@/destination/destination.entity';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DestinationFactory } from '../factories/destination.factory';

@Injectable()
export class DestinationSeeder {
  constructor(private readonly dataSource: DataSource) {}

  async run(DESTINATION: number) {
    const destinationRepository = this.dataSource.getRepository(Destination);
    const destinations = Array.from({ length: DESTINATION }, () =>
      DestinationFactory(),
    );
    await destinationRepository.save(destinations);
    console.log(`✅ Destination Seeder: ${DESTINATION} destinations created.`);
  }
}
