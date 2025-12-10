import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTripDto, UpdateTripDto } from './trip.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Trip } from './trip.entity';
import { In, Repository } from 'typeorm';
import { Destination } from '@/destination/destination.entity';

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(Trip)
    private tripRepository: Repository<Trip>,
    @InjectRepository(Destination)
    private destinationRepository: Repository<Destination>,
  ) {}
  async create(createTripDto: CreateTripDto): Promise<Trip> {
    const destinationIds = Array.from(new Set(createTripDto.destinations));
    const destinationEntities = await this.destinationRepository.findBy({
      id: In(destinationIds),
    });

    if (destinationEntities.length !== destinationIds.length) {
      throw new NotFoundException('Some destination IDs do not exist');
    }
    const { destinations, ...tripData } = createTripDto;
    tripData.booked = 0;
    const trip = this.tripRepository.create({
      ...tripData,
      destinations: destinationEntities,
    });
    return await this.tripRepository.save(trip);
  }

  async findAll(): Promise<Trip[]> {
    return this.tripRepository.find({
      relations: ['destinations', 'destinations.trips'],
    });
  }

  async findOne(id: string): Promise<Trip> {
    return this.tripRepository.findOneOrFail({
      where: { id },
      relations: ['destinations', 'destinations.trips'],
    });
  }

  async update(id: string, updateTripDto: UpdateTripDto) {
    const trip = await this.tripRepository.findOneOrFail({
      where: { id },
      relations: ['destinations', 'destinations.trips'],
    });

    if (updateTripDto.destinations) {
      const destinationIds = Array.from(new Set(updateTripDto.destinations));

      const destinationEntities = await this.destinationRepository.findBy({
        id: In(destinationIds),
      });

      if (destinationEntities.length !== destinationIds.length) {
        throw new NotFoundException('Some destination IDs do not exist');
      }

      trip.destinations = destinationEntities;
    }

    const { destinations, ...rest } = updateTripDto;
    Object.assign(trip, rest);

    return this.tripRepository.save(trip);
  }

  async remove(id: string) {
    const trip = await this.tripRepository.findOneByOrFail({ id });
    return this.tripRepository.remove(trip);
  }
}
