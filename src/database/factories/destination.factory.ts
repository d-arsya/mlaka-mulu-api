import { Destination } from '@/destination/destination.entity';
import { faker } from '@faker-js/faker';

export const DestinationFactory = (): Destination => {
  const destination = new Destination();
  destination.name = faker.food.ethnicCategory();
  destination.description = faker.food.description();

  return destination;
};
