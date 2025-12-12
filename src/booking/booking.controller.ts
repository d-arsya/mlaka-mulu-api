import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  ParseUUIDPipe,
  ForbiddenException,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto, UpdateBookingDto } from './booking.dto';
import { Booking, BookingStatus } from './booking.entity';
import { CurrentUser } from '@/auth/user.decorator';
import { User } from '@/user/user.entity';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/jwt.guard';
import { ApiResponseDto } from '@/common/response.dto';
import { Trip } from '@/trip/trip.entity';
import { PoliciesGuard } from '@/auth/policy.guard';
import { CheckPolicies } from '@/auth/policy.decorator';
import {
  Action,
  AppAbility,
  CaslAbilityFactory,
} from '@/casl/casl-ability.factory';
import { subject } from '@casl/ability';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('booking')
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly casl: CaslAbilityFactory,
  ) {}

  @Post()
  @ApiExtraModels(ApiResponseDto, Booking, Trip, User)
  @ApiCreatedResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            data: { $ref: getSchemaPath(Booking) },
          },
        },
      ],
    },
  })
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, Booking))
  create(
    @Body() createBookingDto: CreateBookingDto,
    @CurrentUser() user: User,
  ) {
    createBookingDto.status = BookingStatus.UNPAID;
    return this.bookingService.create(createBookingDto, user);
  }

  @Get()
  @ApiExtraModels(ApiResponseDto, Booking, Trip, User)
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(Booking) },
            },
          },
        },
      ],
    },
  })
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Booking))
  findAll(@CurrentUser() user: User) {
    return this.bookingService.findAll(user);
  }

  @Get(':id')
  @ApiExtraModels(ApiResponseDto, Booking, Trip, User)
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            data: { $ref: getSchemaPath(Booking) },
          },
        },
      ],
    },
  })
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Booking))
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @CurrentUser() currentUser: User,
  ) {
    const booking = await this.bookingService.findOne(id);
    const ability = this.casl.createForUser(currentUser);
    if (!ability.can(Action.Read, booking)) {
      throw new ForbiddenException();
    }
    return booking;
  }

  @Patch(':id')
  @ApiExtraModels(ApiResponseDto, Booking, Trip, User)
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            data: { $ref: getSchemaPath(Booking) },
          },
        },
      ],
    },
  })
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, Booking))
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateBookingDto: UpdateBookingDto,
    @CurrentUser() currentUser: User,
  ) {
    const booking = await this.bookingService.findOne(id);

    const ability = this.casl.createForUser(currentUser);
    if (!ability.can(Action.Update, booking)) {
      throw new ForbiddenException();
    }
    return this.bookingService.update(id, updateBookingDto);
  }
}
