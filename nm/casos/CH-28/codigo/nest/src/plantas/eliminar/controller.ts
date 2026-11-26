import { Controller, Delete, Param, ParseIntPipe, HttpCode } from '@nestjs/common';
import { EliminarService } from './service';

@Controller()
export class EliminarController {
  constructor(private readonly service: EliminarService) {}

  @Delete('plantas/:plantaId')
  @HttpCode(204)
  async ejecutar(@Param('plantaId', ParseIntPipe) plantaId: number) {
    return this.service.eliminarPlantaService(plantaId);
  }
}
