import { AbstractEntity } from '@/database/abstract.entity';
import { Destination } from '@/destination/destination.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Trip extends AbstractEntity {
  @Column()
  @ApiProperty()
  name: string;

  @Column('timestamptz')
  @ApiProperty()
  startDate: Date;

  @Column('timestamptz')
  @ApiProperty()
  endDate: Date;

  @Column('integer')
  @ApiProperty()
  price: number;

  @Column('integer', { default: 0 })
  @ApiProperty()
  quota: number;

  @Column('integer', { default: 0 })
  @ApiProperty()
  booked: number;

  @ManyToMany(() => Destination, (destination) => destination.trips, {
    cascade: true,
  })
  @JoinTable()
  @ApiProperty({ type: () => [Destination] })
  destinations: Destination[];
}
