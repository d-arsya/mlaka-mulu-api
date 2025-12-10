import { AbstractEntity } from '@/database/abstract.entity';
import { Trip } from '@/trip/trip.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Destination extends AbstractEntity {
  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  description: string;

  @ManyToMany(() => Trip, (trip) => trip.destinations)
  @ApiProperty({ type: () => [Trip] })
  trips: Trip[];
}
