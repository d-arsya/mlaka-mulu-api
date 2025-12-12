import { AbstractEntity } from '@/database/abstract.entity';
import { Trip } from '@/trip/trip.entity';
import { User } from '@/user/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, ManyToOne } from 'typeorm';

export enum BookingStatus {
  PAID = 'paid',
  UNPAID = 'unpaid',
  CANCELED = 'canceled',
}

@Entity()
export class Booking extends AbstractEntity {
  @Column()
  @ApiProperty()
  amount: number;

  @Column()
  @ApiProperty()
  bill: number;

  @Column({ type: 'enum', enum: BookingStatus, default: BookingStatus.UNPAID })
  @ApiProperty()
  status: BookingStatus;

  @ManyToOne(() => User, (user) => user.bookings)
  @ApiProperty({ type: () => User })
  user: User;

  @ManyToOne(() => Trip, (trip) => trip.bookings)
  @ApiProperty({ type: () => Trip })
  trip: Trip;
}
