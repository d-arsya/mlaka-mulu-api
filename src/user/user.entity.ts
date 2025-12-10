import { Booking } from '@/booking/booking.entity';
import { TouristTrip } from '@/tourist-trip/tourist-trip.entity';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Entity } from 'typeorm';

export enum UserRole {
  OWNER = 'owner',
  EMPLOYEE = 'employee',
  TOURIST = 'tourist',
}
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.TOURIST,
  })
  role: UserRole;

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];

  @OneToMany(() => TouristTrip, (trip) => trip.user)
  trips: TouristTrip[];
}
