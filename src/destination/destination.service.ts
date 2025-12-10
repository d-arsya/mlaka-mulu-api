import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDestinationDto } from './destination.dto';
import { UpdateDestinationDto } from './destination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Destination } from './destination.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DestinationService {
  constructor(
    @InjectRepository(Destination)
    private destinationRepository: Repository<Destination>,
  ) {}
  async create(
    createDestinationDto: CreateDestinationDto,
  ): Promise<Destination> {
    const destination = this.destinationRepository.create(createDestinationDto);
    return this.destinationRepository.save(destination);
  }

  async findAll(): Promise<Destination[]> {
    return this.destinationRepository.find({
      relations: ['trips', 'trips.destinations'],
    });
  }

  async findOne(id: string): Promise<Destination> {
    return this.destinationRepository.findOneOrFail({
      where: { id },
      relations: ['trips'],
    });
  }

  async update(
    id: string,
    updateDestinationDto: UpdateDestinationDto,
  ): Promise<Destination> {
    const destination = await this.destinationRepository.findOneOrFail({
      where: { id },
      relations: ['trips'],
    });
    const updated = this.destinationRepository.merge(
      destination,
      updateDestinationDto,
    );

    await this.destinationRepository.save(updated);

    return updated;
  }

  async remove(id: string) {
    const destination = await this.destinationRepository.findOneOrFail({
      where: { id },
    });
    return this.destinationRepository.remove(destination);
  }
}
