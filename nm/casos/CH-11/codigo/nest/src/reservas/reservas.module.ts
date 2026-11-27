import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from '../hoteles/entities/hotel.entity';
import { Reserva } from './entities/reserva.entity';
import { ReservasService } from './reservas.service';
import { ReservasController } from './reservas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel, Reserva])],
  providers: [ReservasService],
  controllers: [ReservasController]
})
export class ReservasModule {}
