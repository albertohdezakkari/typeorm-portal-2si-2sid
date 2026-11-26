import { Controller, Get, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TallerModule } from './taller.module';

@Controller('salud')
class SaludController {
  constructor(private readonly db: DataSource) {}

  @Get()
  async salud() {
    const [resultado] = await this.db.query('SELECT current_database() AS base');
    return { estado: 'ok', base: resultado.base };
  }
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true // Solo en esta base de práctica.
    }),
    TallerModule
  ],
  controllers: [SaludController]
})
export class AppModule {}
