// seed.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { MainSeeder } from '@/database/seeders/database.seeder';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);

  try {
    const seeder = appContext.get(MainSeeder);
    await seeder.run();
  } catch (error) {
    console.error('Seeding failed!', error);
    process.exit(1);
  } finally {
    await appContext.close();
    process.exit(0);
  }
}

bootstrap();
