import { Destination } from '@/destination/entities/destination.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('timestamptz')
  startDate: Date;

  @Column('timestamptz')
  endDate: Date;

  @Column('integer')
  price: number;

  @Column('integer')
  quota: number;

  @Column('integer')
  booked: number;

  @ManyToMany(() => Destination)
  @JoinTable()
  destionations: Destination[];
}
