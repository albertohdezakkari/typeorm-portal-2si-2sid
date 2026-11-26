import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { ModificarAlturaCmService } from './service';

@Controller()
export class ModificarAlturaCmController {
  constructor(private readonly service: ModificarAlturaCmService) {}

  @Patch('plantas/:plantaId')
  async ejecutar(@Param('plantaId', ParseIntPipe) plantaId: number,
    @Body() datos: { alturaCm: number }) {
    return this.service.modificarAlturaCmService(plantaId, datos.alturaCm);
  }
}
