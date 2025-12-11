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
import { DestinationService } from './destination.service';
import { CreateDestinationDto, UpdateDestinationDto } from './destination.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { Destination } from './destination.entity';
import { ApiResponseDto } from '@/common/response.dto';
import { JwtAuthGuard } from '@/auth/jwt.guard';
import { PoliciesGuard } from '@/auth/policy.guard';
import { CheckPolicies } from '@/auth/policy.decorator';
import { Action, AppAbility } from '@/casl/casl-ability.factory';
import { Public } from '@/auth/public.decorator';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
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
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Create, Destination),
  )
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
  @Public()
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
  @Public()
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
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Update, Destination),
  )
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateDestinationDto: UpdateDestinationDto,
  ) {
    return this.destinationService.update(id, updateDestinationDto);
  }

  @Delete(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Delete, Destination),
  )
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.destinationService.remove(id);
  }
}
