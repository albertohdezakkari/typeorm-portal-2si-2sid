import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ModificarRolService } from './service';

@Controller('piezas/:piezaId/asignaciones/:restauradorId')
export class ModificarRolController {
  constructor(private readonly service: ModificarRolService) {}

  @Patch()
  modificar(@Param('piezaId') piezaId: string, @Param('restauradorId') restauradorId: string, @Body() datos: { rol: string }) {
    return this.service.modificarRolService(Number(piezaId), Number(restauradorId), datos.rol);
  }
}
