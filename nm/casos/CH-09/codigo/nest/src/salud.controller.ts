import { Controller, Get } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Controller('salud')
export class SaludController {
  constructor(private readonly dataSource: DataSource) {}

  @Get()
  comprobarConexion() {
    return {
      estado: this.dataSource.isInitialized ? 'ok' : 'sin conexión',
      base: this.dataSource.options.database
    };
  }
}
