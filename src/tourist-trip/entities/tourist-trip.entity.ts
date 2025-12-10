import { Trip } from '@/trip/entities/trip.entity';
import { User } from '@/user/entities/user.entity';
import { JoinColumn, OneToOne, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TouristTrip {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Trip)
  @JoinColumn()
  trip: Trip;
}
