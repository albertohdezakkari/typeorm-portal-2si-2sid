import { Controller, Delete, Param, ParseIntPipe, HttpCode } from '@nestjs/common';
import { EliminarService } from './service';

@Controller()
export class EliminarController {
  constructor(private readonly service: EliminarService) {}

  @Delete('piezas/:piezaId')
  @HttpCode(204)
  async ejecutar(@Param('piezaId', ParseIntPipe) piezaId: number) {
    return this.service.eliminarPiezaService(piezaId);
  }
}
