import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hospital } from './entities/hospital.entity';
import { HospitalesService } from './hospitales.service';
import { HospitalesController } from './hospitales.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Hospital])],
  providers: [HospitalesService],
  controllers: [HospitalesController]
})
export class HospitalesModule {}