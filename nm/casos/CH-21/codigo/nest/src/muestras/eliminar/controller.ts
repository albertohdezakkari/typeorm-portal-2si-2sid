import { Controller, Delete, Param, ParseIntPipe, HttpCode } from '@nestjs/common';
import { EliminarService } from './service';

@Controller()
export class EliminarController {
  constructor(private readonly service: EliminarService) {}

  @Delete('muestras/:muestraId')
  @HttpCode(204)
  async ejecutar(@Param('muestraId', ParseIntPipe) muestraId: number) {
    return this.service.eliminarMuestraService(muestraId);
  }
}
