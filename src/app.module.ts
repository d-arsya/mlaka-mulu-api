import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TouristTripModule } from './tourist-trip/tourist-trip.module';
import { BookingModule } from './booking/booking.module';
import { TripModule } from './trip/trip.module';
import { DestinationModule } from './destination/destination.module';
import path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const entitiesPath = path.join(__dirname, '**/*.entity{.ts,.js}');
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          entities: [entitiesPath],
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
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
