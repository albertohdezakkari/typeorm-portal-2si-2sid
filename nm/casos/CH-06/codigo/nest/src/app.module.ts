import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'node:path';
import { SaludController } from './salud.controller';
import { SesionesModule } from './sesiones/sesiones.module';
import { InstructoresModule } from './instructores/instructores.module';
import { AsignacionesModule } from './asignaciones/asignaciones.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [resolve(__dirname, '../.env'), resolve(__dirname, '../.env.example')]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.getOrThrow<string>('DB_HOST'),
        port: Number(config.getOrThrow<string>('DB_PORT')),
        username: config.getOrThrow<string>('DB_USER'),
        password: config.getOrThrow<string>('DB_PASSWORD'),
        database: config.getOrThrow<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true
      })
    }),
    SesionesModule,
    InstructoresModule,
    AsignacionesModule
  ],
  controllers: [SaludController]
})
export class AppModule {}
