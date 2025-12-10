import { User } from '@/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @CreateDateColumn({
    name: 'booking_date',
    type: 'timestamp',
    precision: 3,
  })
  bookingDate: Date;

  @ManyToOne(() => User, (user) => user.bookings)
  user: User;
}
