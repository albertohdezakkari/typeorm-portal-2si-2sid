import { Controller, Delete, Param, ParseIntPipe, HttpCode } from '@nestjs/common';
import { EliminarService } from './service';

@Controller()
export class EliminarController {
  constructor(private readonly service: EliminarService) {}

  @Delete('plazas/:plazaId')
  @HttpCode(204)
  async ejecutar(@Param('plazaId', ParseIntPipe) plazaId: number) {
    return this.service.eliminarPlazaService(plazaId);
  }
}
