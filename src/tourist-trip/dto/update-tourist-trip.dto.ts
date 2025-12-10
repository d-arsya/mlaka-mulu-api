import { PartialType } from '@nestjs/swagger';
import { CreateTouristTripDto } from './create-tourist-trip.dto';

export class UpdateTouristTripDto extends PartialType(CreateTouristTripDto) {}
