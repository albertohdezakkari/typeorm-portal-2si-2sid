import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ModificarRolService } from './service';

@Controller('trayectos/:trayectoId/asignaciones/:conductorId')
export class ModificarRolController {
  constructor(private readonly service: ModificarRolService) {}

  @Patch()
  modificar(@Param('trayectoId') trayectoId: string, @Param('conductorId') conductorId: string, @Body() datos: { rol: string }) {
    return this.service.modificarRolService(Number(trayectoId), Number(conductorId), datos.rol);
  }
}
