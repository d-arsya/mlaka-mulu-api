import { Module } from '@nestjs/common';
import { DestinationService } from './destination.service';
import { DestinationController } from './destination.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Destination } from './destination.entity';
import { CaslModule } from '@/casl/casl.module';

@Module({
  imports: [TypeOrmModule.forFeature([Destination]), CaslModule],
  controllers: [DestinationController],
  providers: [DestinationService],
})
export class DestinationModule {}
