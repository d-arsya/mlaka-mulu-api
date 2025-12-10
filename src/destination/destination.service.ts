import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDestinationDto } from './dto/destination.dto';
import { UpdateDestinationDto } from './dto/destination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Destination } from './entities/destination.entity';
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
    return this.destinationRepository.find();
  }

  async findOne(id: string): Promise<Destination> {
    const destination = await this.destinationRepository.findOneBy({ id });

    if (!destination) {
      throw new NotFoundException(`Destination with ID ${id} not found`);
    }

    return destination;
  }

  async update(
    id: string,
    updateDestinationDto: UpdateDestinationDto,
  ): Promise<{ message: string; destination: Destination }> {
    const destination = await this.destinationRepository.findOneBy({ id });
    if (!destination) {
      throw new NotFoundException(`Destination with ID ${id} not found`);
    }

    const updated = this.destinationRepository.merge(
      destination,
      updateDestinationDto,
    );

    await this.destinationRepository.save(updated);

    return {
      message: `Destination with ID ${id} has been updated successfully.`,
      destination: updated,
    };
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.destinationRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Destination with ID ${id} not found`);
    }

    return {
      message: `Destination with ID ${id} has been deleted successfully.`,
    };
  }
}
