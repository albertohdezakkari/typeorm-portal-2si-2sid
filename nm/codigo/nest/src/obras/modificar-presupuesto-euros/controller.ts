import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { ModificarPresupuestoEurosService } from './service';

@Controller()
export class ModificarPresupuestoEurosController {
  constructor(private readonly service: ModificarPresupuestoEurosService) {}

  @Patch('obras/:obraId')
  async ejecutar(@Param('obraId', ParseIntPipe) obraId: number,
    @Body() datos: { presupuestoEuros: number }) {
    return this.service.modificarPresupuestoEurosService(obraId, datos.presupuestoEuros);
  }
}
