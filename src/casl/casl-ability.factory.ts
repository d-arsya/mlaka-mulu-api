import { Booking } from '@/booking/booking.entity';
import { Destination } from '@/destination/destination.entity';
import { TouristTrip } from '@/tourist-trip/tourist-trip.entity';
import { Trip } from '@/trip/trip.entity';
import { User, UserRole } from '@/user/user.entity';
import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';

type Subjects =
  | InferSubjects<
      | typeof Trip
      | typeof Destination
      | typeof User
      | typeof Booking
      | typeof TouristTrip
    >
  | 'all';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      Ability as AbilityClass<AppAbility>,
    );
    can(Action.Update, User, { id: user.id });
    can(Action.Read, User, { id: user.id });
    can(Action.Read, [Trip, Destination]);

    if (user.role === UserRole.OWNER) {
      can(Action.Manage, User, { role: UserRole.EMPLOYEE });
    } else if (user.role === UserRole.EMPLOYEE) {
      can(Action.Manage, [Trip, Destination]);
      can(Action.Manage, User, { role: UserRole.TOURIST });
      can(Action.Manage, Booking);
    } else if (user.role === UserRole.TOURIST) {
      can(Action.Read, TouristTrip);
      can(Action.Read, TouristTrip, { user: { id: user.id } });
      can(Action.Read, Booking, { user: { id: user.id } });
      can(Action.Update, Booking, { user: { id: user.id } });
      can(Action.Create, Booking);
      cannot(Action.Read, User);
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
