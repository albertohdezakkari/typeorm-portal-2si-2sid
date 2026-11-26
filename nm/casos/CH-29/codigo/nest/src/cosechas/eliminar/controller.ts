import { Controller, Delete, Param, ParseIntPipe, HttpCode } from '@nestjs/common';
import { EliminarService } from './service';

@Controller()
export class EliminarController {
  constructor(private readonly service: EliminarService) {}

  @Delete('cosechas/:cosechaId')
  @HttpCode(204)
  async ejecutar(@Param('cosechaId', ParseIntPipe) cosechaId: number) {
    return this.service.eliminarCosechaService(cosechaId);
  }
}
