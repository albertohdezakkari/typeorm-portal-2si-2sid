import { Controller, Delete, Param, ParseIntPipe, HttpCode } from '@nestjs/common';
import { EliminarService } from './service';

@Controller()
export class EliminarController {
  constructor(private readonly service: EliminarService) {}

  @Delete('zonas/:zonaId')
  @HttpCode(204)
  async ejecutar(@Param('zonaId', ParseIntPipe) zonaId: number) {
    return this.service.eliminarZonaService(zonaId);
  }
}
