import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ModificarRolService } from './service';

@Controller('pistas/:pistaId/asignaciones/:entrenadorId')
export class ModificarRolController {
  constructor(private readonly service: ModificarRolService) {}

  @Patch()
  modificar(@Param('pistaId') pistaId: string, @Param('entrenadorId') entrenadorId: string, @Body() datos: { rol: string }) {
    return this.service.modificarRolService(Number(pistaId), Number(entrenadorId), datos.rol);
  }
}
