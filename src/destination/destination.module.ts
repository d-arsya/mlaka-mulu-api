import { Module } from '@nestjs/common';
import { DestinationService } from './destination.service';
import { DestinationController } from './destination.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Destination } from './entities/destination.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Destination])],
  controllers: [DestinationController],
  providers: [DestinationService],
})
export class DestinationModule {}
