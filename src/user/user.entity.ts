import { Booking } from '@/booking/booking.entity';
import { AbstractEntity } from '@/database/abstract.entity';
import { TouristTrip } from '@/tourist-trip/tourist-trip.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Entity } from 'typeorm';

export enum UserRole {
  OWNER = 'owner',
  EMPLOYEE = 'employee',
  TOURIST = 'tourist',
}
@Entity()
export class User extends AbstractEntity {
  @Column()
  @ApiProperty()
  name: string;

  @Column({ unique: true })
  @ApiProperty()
  email: string;

  @Column({ unique: true })
  @ApiProperty()
  phone: string;

  @Column()
  @ApiProperty()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.TOURIST,
  })
  @ApiProperty()
  role: UserRole;

  @OneToMany(() => Booking, (booking) => booking.user)
  @ApiProperty({ type: () => [Booking] })
  bookings: Booking[];

  @OneToMany(() => TouristTrip, (trip) => trip.user)
  @ApiProperty({ type: () => [TouristTrip] })
  trips: TouristTrip[];
}
