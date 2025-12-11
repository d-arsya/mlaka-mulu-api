import { AbstractEntity } from '@/database/abstract.entity';
import { Trip } from '@/trip/trip.entity';
import { User } from '@/user/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  JoinColumn,
  OneToOne,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class TouristTrip extends AbstractEntity {
  @ManyToOne(() => User, (user) => user.trips)
  @ApiProperty({ type: () => User })
  user: User;

  @ManyToOne(() => Trip, (trip) => trip.trips)
  @ApiProperty({ type: () => Trip })
  trip: Trip;
}
