import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TouristTripService } from './tourist-trip.service';
import { CreateTouristTripDto, UpdateTouristTripDto } from './tourist-trip.dto';
import { CurrentUser } from '@/auth/user.decorator';
import { User } from '@/user/user.entity';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/jwt.guard';
import { ApiResponseDto } from '@/common/response.dto';
import { TouristTrip } from './tourist-trip.entity';
import { Trip } from '@/trip/trip.entity';
import { PoliciesGuard } from '@/auth/policy.guard';
import { CheckPolicies } from '@/auth/policy.decorator';
import { Action, AppAbility } from '@/casl/casl-ability.factory';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tourist-trip')
export class TouristTripController {
  constructor(private readonly touristTripService: TouristTripService) {}

  @Get()
  @ApiExtraModels(ApiResponseDto, TouristTrip, Trip, User)
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(TouristTrip) },
            },
          },
        },
      ],
    },
  })
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, TouristTrip))
  findAll(@CurrentUser() currentUser: User) {
    return this.touristTripService.findByUser(currentUser);
  }

  @Get(':id')
  @ApiExtraModels(ApiResponseDto, TouristTrip, Trip, User)
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            data: { $ref: getSchemaPath(TouristTrip) },
          },
        },
      ],
    },
  })
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, TouristTrip))
  findOne(@Param('id') id: string) {
    return this.touristTripService.findOne(id);
  }
}
