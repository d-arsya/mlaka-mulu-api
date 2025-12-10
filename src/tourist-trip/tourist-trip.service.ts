import { Injectable } from '@nestjs/common';
import { CreateTouristTripDto, UpdateTouristTripDto } from './tourist-trip.dto';

@Injectable()
export class TouristTripService {
  create(createTouristTripDto: CreateTouristTripDto) {
    return 'This action adds a new touristTrip';
  }

  findAll() {
    return `This action returns all touristTrip`;
  }

  findOne(id: number) {
    return `This action returns a #${id} touristTrip`;
  }

  update(id: number, updateTouristTripDto: UpdateTouristTripDto) {
    return `This action updates a #${id} touristTrip`;
  }

  remove(id: number) {
    return `This action removes a #${id} touristTrip`;
  }
}
