import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'node:path';
import { SaludController } from './salud.controller';
import { PistasModule } from './pistas/pistas.module';
import { EntrenadoresModule } from './entrenadores/entrenadores.module';
import { AsignacionesModule } from './asignaciones/asignaciones.module';

import { ComplejosModule } from './complejos/complejos.module';

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
    ComplejosModule,
    PistasModule,
    EntrenadoresModule,
    AsignacionesModule
  ],
  controllers: [SaludController]
})
export class AppModule {}
