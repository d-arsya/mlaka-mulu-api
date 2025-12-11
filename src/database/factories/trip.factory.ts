import { Trip } from '@/trip/trip.entity';
import { faker } from '@faker-js/faker';

export const TripFactory = (): Trip => {
  const trip = new Trip();

  const startDate = faker.date.future({ years: 1 });
  const endDate = faker.date.future({ refDate: startDate, years: 0.1 });

  trip.name = faker.lorem.words({ min: 3, max: 5 });
  trip.startDate = startDate;
  trip.endDate = endDate;
  trip.price = faker.number.int({ min: 500000, max: 20000000 });
  trip.quota = faker.number.int({ min: 10, max: 50 });
  trip.booked = 0;
  trip.destinations = [];

  return trip;
};
