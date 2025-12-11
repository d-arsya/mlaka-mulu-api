import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Booking, BookingStatus } from '@/booking/booking.entity';
import { Trip } from '@/trip/trip.entity';
import { User } from '@/user/user.entity';
import { BookingFactory } from '../factories/booking.factory';
import { TouristTrip } from '@/tourist-trip/tourist-trip.entity';

@Injectable()
export class BookingSeeder {
  constructor(private readonly dataSource: DataSource) {}

  async run(BOOK: number) {
    const bookingRepository = this.dataSource.getRepository(Booking);
    const tripRepository = this.dataSource.getRepository(Trip);
    const userRepository = this.dataSource.getRepository(User);
    const touristTripRepository = this.dataSource.getRepository(TouristTrip);

    const trips = await tripRepository.find();
    const users = await userRepository.find();
    const touristTrips = await touristTripRepository.find();

    if (trips.length === 0 || users.length === 0) {
      console.log('⚠️ Booking Seeder skipped: No trips or users found.');
      return;
    }

    const bookings: Booking[] = [];

    for (let i = 0; i < BOOK; i++) {
      const trip = trips[Math.floor(Math.random() * trips.length)];
      const user = users[Math.floor(Math.random() * users.length)];
      if (trip.quota <= 0) continue;

      const booking = BookingFactory(trip, user);
      if (booking.status === BookingStatus.PAID) {
        const userTrip = new TouristTrip();
        userTrip.user = user;
        userTrip.trip = trip;
        touristTrips.push(userTrip);
      }
      bookings.push(booking);
    }

    await bookingRepository.save(bookings);
    await tripRepository.save(trips);
    await touristTripRepository.save(touristTrips);

    console.log(`✅ Booking Seeder: ${bookings.length} bookings created.`);
    console.log(`✅ ${touristTrips.length} trip history created.`);
  }
}
