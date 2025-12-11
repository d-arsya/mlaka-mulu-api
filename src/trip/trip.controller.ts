import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto, UpdateTripDto } from './trip.dto';
import { ApiResponseDto } from '@/common/response.dto';
import { Trip } from './trip.entity';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { Destination } from '@/destination/destination.entity';
import { JwtAuthGuard } from '@/auth/jwt.guard';
import { Action, AppAbility } from '@/casl/casl-ability.factory';
import { CheckPolicies } from '@/auth/policy.decorator';
import { PoliciesGuard } from '@/auth/policy.guard';
import { Public } from '@/auth/public.decorator';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
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
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, Trip))
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
  @Public()
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
  @Public()
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
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Update, Destination),
  )
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTripDto: UpdateTripDto,
  ) {
    return this.tripService.update(id, updateTripDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Delete, Destination),
  )
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.tripService.remove(id);
  }
}
