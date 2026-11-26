import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { TrasladarService } from './service';

@Controller()
export class TrasladarController {
  constructor(private readonly service: TrasladarService) {}

  @Patch('plantas/:plantaId/vivero')
  async ejecutar(@Param('plantaId', ParseIntPipe) plantaId: number,
    @Body() datos: { viveroId: number }) {
    return this.service.trasladarPlantaService(plantaId, datos.viveroId);
  }
}
