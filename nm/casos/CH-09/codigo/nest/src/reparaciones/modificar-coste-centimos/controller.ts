import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { ModificarCosteCentimosService } from './service';

@Controller()
export class ModificarCosteCentimosController {
  constructor(private readonly service: ModificarCosteCentimosService) {}

  @Patch('reparaciones/:reparacionId')
  async ejecutar(@Param('reparacionId', ParseIntPipe) reparacionId: number,
    @Body() datos: { costeCentimos: number }) {
    return this.service.modificarCosteCentimosService(reparacionId, datos.costeCentimos);
  }
}
