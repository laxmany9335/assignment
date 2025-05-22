// src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobModule } from './job/job.module';
import { DatabaseModule } from './job/database/database.module';

@Module({
  imports: [
    // Load environment variables
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    // Database connection
    DatabaseModule,
    
    // Feature modules
    JobModule,
  ],
})
export class AppModule {}