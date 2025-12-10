import { AbstractEntity } from '@/database/abstract.entity';
import { Trip } from '@/trip/trip.entity';
import { User } from '@/user/user.entity';
import { JoinColumn, OneToOne, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TouristTrip extends AbstractEntity {
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Trip)
  @JoinColumn()
  trip: Trip;
}
