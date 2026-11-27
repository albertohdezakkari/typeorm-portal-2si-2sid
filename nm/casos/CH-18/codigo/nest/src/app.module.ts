import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'node:path';
import { SaludController } from './salud.controller';
import { ActividadesModule } from './actividades/actividades.module';
import { MonitoresModule } from './monitores/monitores.module';
import { AsignacionesModule } from './asignaciones/asignaciones.module';

import { ClubesModule } from './clubes/clubes.module';

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
    ClubesModule,
    ActividadesModule,
    MonitoresModule,
    AsignacionesModule
  ],
  controllers: [SaludController]
})
export class AppModule {}
