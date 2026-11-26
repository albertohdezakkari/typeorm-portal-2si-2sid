import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ModificarRolService } from './service';

@Controller('actividades/:actividadId/asignaciones/:monitorId')
export class ModificarRolController {
  constructor(private readonly service: ModificarRolService) {}

  @Patch()
  modificar(@Param('actividadId') actividadId: string, @Param('monitorId') monitorId: string, @Body() datos: { rol: string }) {
    return this.service.modificarRolService(Number(actividadId), Number(monitorId), datos.rol);
  }
}
