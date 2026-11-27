import { Controller, Get, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TallerModule } from './taller.module';

@Controller('salud')
class SaludController {
  constructor(private readonly db: DataSource) {}

  @Get()
  salud() {
    return { estado: this.db.isInitialized ? 'ok' : 'sin conexión', base: process.env.DB_NAME };
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
