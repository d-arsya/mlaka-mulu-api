import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ForbiddenException,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { JwtAuthGuard } from '@/auth/jwt.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { ApiResponseDto } from '@/common/response.dto';
import { User, UserRole } from './user.entity';
import { PoliciesGuard } from '@/auth/policy.guard';
import {
  Action,
  AppAbility,
  CaslAbilityFactory,
} from '@/casl/casl-ability.factory';
import { CheckPolicies } from '@/auth/policy.decorator';
import { CurrentUser } from '@/auth/user.decorator';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly casl: CaslAbilityFactory,
  ) {}

  @Post()
  @ApiExtraModels(ApiResponseDto, User)
  @ApiCreatedResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            data: { $ref: getSchemaPath(User) },
          },
        },
      ],
    },
  })
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, User))
  create(@Body() createUserDto: CreateUserDto, @CurrentUser() user: User) {
    const targetRole = createUserDto.role || UserRole.TOURIST;
    if (user.role === UserRole.OWNER) {
      if (targetRole !== UserRole.EMPLOYEE) {
        throw new ForbiddenException(
          'Owners can only create users with Employee role',
        );
      }
    } else if (user.role === UserRole.EMPLOYEE) {
      if (targetRole !== UserRole.TOURIST) {
        throw new ForbiddenException(
          'Employees can only create users with Tourist role',
        );
      }
    } else {
      throw new ForbiddenException(
        'You do not have permission to create users',
      );
    }
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiExtraModels(ApiResponseDto, User)
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(User) },
            },
          },
        },
      ],
    },
  })
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => !ability.cannot(Action.Read, User))
  findAll(@CurrentUser() user: User) {
    return user.role == UserRole.OWNER
      ? this.userService.findByRole(UserRole.EMPLOYEE)
      : this.userService.findByRole(UserRole.TOURIST);
  }

  @Get(':id')
  @ApiExtraModels(ApiResponseDto, User)
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            data: { $ref: getSchemaPath(User) },
          },
        },
      ],
    },
  })
  @UseGuards(PoliciesGuard)
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @CurrentUser() currentUser: User,
  ) {
    const user = await this.userService.findOne(id);
    const ability = this.casl.createForUser(currentUser);
    if (!ability.can(Action.Read, user)) {
      throw new ForbiddenException();
    }
    return user;
  }

  @Patch(':id')
  @ApiExtraModels(ApiResponseDto, User)
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            data: { $ref: getSchemaPath(User) },
          },
        },
      ],
    },
  })
  @UseGuards(PoliciesGuard)
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() currentUser: User,
  ) {
    const user = await this.userService.findOne(id);
    const ability = this.casl.createForUser(currentUser);
    if (!ability.can(Action.Update, user)) {
      throw new ForbiddenException();
    }
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', new ParseUUIDPipe()) id: string,
    @CurrentUser() currentUser: User,
  ) {
    const user = await this.userService.findOne(id);
    const ability = this.casl.createForUser(currentUser);
    if (!ability.can(Action.Delete, user)) {
      throw new ForbiddenException();
    }
    return this.userService.remove(id);
  }
}
