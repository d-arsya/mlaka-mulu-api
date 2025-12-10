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
import { DestinationService } from './destination.service';
import { CreateDestinationDto, UpdateDestinationDto } from './destination.dto';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiResponse,
  ApiResponseProperty,
  getSchemaPath,
} from '@nestjs/swagger';
import { Destination } from './destination.entity';
import { ApiResponseDto } from '@/common/response.dto';
import { Trip } from '@/trip/trip.entity';

@Controller('destination')
export class DestinationController {
  constructor(private readonly destinationService: DestinationService) {}

  @Post()
  @ApiExtraModels(ApiResponseDto, Destination)
  @ApiCreatedResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            data: { $ref: getSchemaPath(Destination) },
          },
        },
      ],
    },
  })
  create(@Body() createDestinationDto: CreateDestinationDto) {
    return this.destinationService.create(createDestinationDto);
  }

  @Get()
  @ApiExtraModels(ApiResponseDto, Destination)
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(Destination) },
            },
          },
        },
      ],
    },
  })
  findAll() {
    return this.destinationService.findAll();
  }

  @Get(':id')
  @ApiExtraModels(ApiResponseDto, Destination)
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            data: { $ref: getSchemaPath(Destination) },
          },
        },
      ],
    },
  })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.destinationService.findOne(id);
  }

  @Patch(':id')
  @ApiExtraModels(ApiResponseDto, Destination)
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            data: { $ref: getSchemaPath(Destination) },
          },
        },
      ],
    },
  })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateDestinationDto: UpdateDestinationDto,
  ) {
    return this.destinationService.update(id, updateDestinationDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.destinationService.remove(id);
  }
}
