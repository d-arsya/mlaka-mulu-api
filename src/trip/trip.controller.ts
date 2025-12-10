import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto, UpdateTripDto } from './trip.dto';
import { ApiResponseDto } from '@/common/response.dto';
import { Trip } from './trip.entity';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { Destination } from '@/destination/destination.entity';

@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @ApiExtraModels(ApiResponseDto, Trip)
  @ApiCreatedResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            data: { $ref: getSchemaPath(Trip) },
          },
        },
      ],
    },
  })
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }

  @Get()
  @ApiExtraModels(ApiResponseDto, Trip, Destination)
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(Trip) },
            },
          },
        },
      ],
    },
  })
  findAll() {
    return this.tripService.findAll();
  }

  @Get(':id')
  @ApiExtraModels(ApiResponseDto, Trip)
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            data: { $ref: getSchemaPath(Trip) },
          },
        },
      ],
    },
  })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.tripService.findOne(id);
  }

  @Patch(':id')
  @ApiExtraModels(ApiResponseDto, Trip)
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            data: { $ref: getSchemaPath(Trip) },
          },
        },
      ],
    },
  })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTripDto: UpdateTripDto,
  ) {
    return this.tripService.update(id, updateTripDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.tripService.remove(id);
  }
}
