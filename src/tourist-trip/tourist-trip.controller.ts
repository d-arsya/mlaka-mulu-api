import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TouristTripService } from './tourist-trip.service';
import { CreateTouristTripDto } from './dto/create-tourist-trip.dto';
import { UpdateTouristTripDto } from './dto/update-tourist-trip.dto';

@Controller('tourist-trip')
export class TouristTripController {
  constructor(private readonly touristTripService: TouristTripService) {}

  @Post()
  create(@Body() createTouristTripDto: CreateTouristTripDto) {
    return this.touristTripService.create(createTouristTripDto);
  }

  @Get()
  findAll() {
    return this.touristTripService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.touristTripService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTouristTripDto: UpdateTouristTripDto) {
    return this.touristTripService.update(+id, updateTouristTripDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.touristTripService.remove(+id);
  }
}
