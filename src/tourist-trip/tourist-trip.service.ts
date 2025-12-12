import { Injectable } from '@nestjs/common';
import { CreateTouristTripDto, UpdateTouristTripDto } from './tourist-trip.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TouristTrip } from './tourist-trip.entity';
import { Repository } from 'typeorm';
import { User } from '@/user/user.entity';

@Injectable()
export class TouristTripService {
  constructor(
    @InjectRepository(TouristTrip)
    private readonly touristTripRepository: Repository<TouristTrip>,
  ) {}
  create(createTouristTripDto: CreateTouristTripDto) {
    return 'This action adds a new touristTrip';
  }

  async findByUser(user: User): Promise<TouristTrip[]> {
    return this.touristTripRepository.find({
      where: { user: { id: user.id } },
      relations: ['trip', 'user'],
    });
  }

  async findOne(id: string): Promise<TouristTrip> {
    return await this.touristTripRepository.findOneOrFail({
      where: { id },
      relations: ['trip', 'user'],
    });
  }
}
