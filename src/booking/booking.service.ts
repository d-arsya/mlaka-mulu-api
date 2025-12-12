import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateBookingDto, UpdateBookingDto } from './booking.dto';
import { Booking, BookingStatus } from './booking.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from '@/user/user.entity';
import { Trip } from '@/trip/trip.entity';
import { TouristTrip } from '@/tourist-trip/tourist-trip.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(Trip)
    private tripRepository: Repository<Trip>,
    @InjectRepository(TouristTrip)
    private touristTripRepository: Repository<TouristTrip>,
  ) {}
  async create(
    createBookingDto: CreateBookingDto,
    user: User,
  ): Promise<Booking> {
    const trip = await this.tripRepository.findOneOrFail({
      where: { id: createBookingDto.tripId },
    });
    if (trip.quota < createBookingDto.amount) {
      throw new UnauthorizedException('Trip quota is less then amount');
    }
    const booking = this.bookingRepository.create({
      amount: createBookingDto.amount,
      status: createBookingDto.status,
      bill: createBookingDto.amount * trip.price,
      user: user,
      trip,
    });
    trip.quota -= createBookingDto.amount;
    this.tripRepository.save(trip);

    return this.bookingRepository.save(booking);
  }

  async findAll(user: User): Promise<Booking[]> {
    if (user.role == UserRole.TOURIST) {
      return this.bookingRepository.find({
        where: { user: { id: user.id } },
        relations: ['trip', 'trip.destinations'],
      });
    }
    return this.bookingRepository.find({
      relations: ['trip', 'trip.destinations', 'user'],
    });
  }

  async findOne(id: string): Promise<Booking> {
    return this.bookingRepository.findOneOrFail({
      where: { id },
      relations: ['trip', 'trip.destinations', 'user'],
    });
  }

  async update(
    id: string,
    updateBookingDto: UpdateBookingDto,
  ): Promise<Booking> {
    const booking = await this.bookingRepository.findOneOrFail({
      where: { id },
      relations: ['trip', 'user'],
    });
    if (booking.status == BookingStatus.CANCELED) {
      throw new UnauthorizedException('Booking is canceled');
    }

    const trip = booking.trip;
    if (updateBookingDto.amount !== undefined) {
      booking.bill = trip.price * updateBookingDto.amount;
      const oldAmount = booking.amount;
      const newAmount = updateBookingDto.amount;
      if (newAmount > oldAmount) {
        const additional = newAmount - oldAmount;
        if (trip.quota < additional) {
          throw new UnauthorizedException('Not enough quota for update');
        }
        trip.quota -= additional;
      }
      if (newAmount < oldAmount) {
        const returned = oldAmount - newAmount;
        trip.quota += returned;
      }
    }
    if (updateBookingDto.status == BookingStatus.PAID) {
      const userTrip = new TouristTrip();
      userTrip.user = booking.user;
      userTrip.trip = booking.trip;
      await this.touristTripRepository.save(userTrip);
    }
    this.bookingRepository.merge(booking, updateBookingDto);
    await this.tripRepository.save(trip);
    return await this.bookingRepository.save(booking);
  }
}
