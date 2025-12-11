import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TouristTripModule } from './tourist-trip/tourist-trip.module';
import { BookingModule } from './booking/booking.module';
import { TripModule } from './trip/trip.module';
import { DestinationModule } from './destination/destination.module';
import { DatabaseModule } from './database/database.module';
import { SeederModule } from './database/seeders/seeder.module';
import { CaslModule } from './casl/casl.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SeederModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          autoLoadEntities: true,
          synchronize: configService.get<string>('NODE_ENV') !== 'production',
          logging: false,
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    DestinationModule,
    TripModule,
    BookingModule,
    TouristTripModule,
    DatabaseModule,
    CaslModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
