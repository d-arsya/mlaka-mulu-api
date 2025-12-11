import { Booking, BookingStatus } from '@/booking/booking.entity';
import { TouristTrip } from '@/tourist-trip/tourist-trip.entity';
import { Trip } from '@/trip/trip.entity';
import { User } from '@/user/user.entity';
import { faker } from '@faker-js/faker';

export const BookingFactory = (
  trip: Trip,
  user: User,
  status?: BookingStatus,
): Booking => {
  const booking = new Booking();
  booking.status = status ?? faker.helpers.enumValue(BookingStatus);
  booking.amount = faker.number.int({ min: 1, max: trip.quota });
  booking.user = user;
  booking.trip = trip;

  trip.quota -= booking.amount;
  trip.booked += booking.amount;
  return booking;
};
