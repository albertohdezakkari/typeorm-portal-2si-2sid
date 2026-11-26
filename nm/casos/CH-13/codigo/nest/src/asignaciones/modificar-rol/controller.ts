import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ModificarRolService } from './service';

@Controller('proyecciones/:proyeccionId/asignaciones/:tecnicoId')
export class ModificarRolController {
  constructor(private readonly service: ModificarRolService) {}

  @Patch()
  modificar(@Param('proyeccionId') proyeccionId: string, @Param('tecnicoId') tecnicoId: string, @Body() datos: { rol: string }) {
    return this.service.modificarRolService(Number(proyeccionId), Number(tecnicoId), datos.rol);
  }
}
