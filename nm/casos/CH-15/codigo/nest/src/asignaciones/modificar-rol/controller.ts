import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ModificarRolService } from './service';

@Controller('proyectos/:proyectoId/asignaciones/:colaboradorId')
export class ModificarRolController {
  constructor(private readonly service: ModificarRolService) {}

  @Patch()
  modificar(@Param('proyectoId') proyectoId: string, @Param('colaboradorId') colaboradorId: string, @Body() datos: { rol: string }) {
    return this.service.modificarRolService(Number(proyectoId), Number(colaboradorId), datos.rol);
  }
}
