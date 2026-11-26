import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ModificarRolService } from './service';

@Controller('sesiones/:sesionId/asignaciones/:instructorId')
export class ModificarRolController {
  constructor(private readonly service: ModificarRolService) {}

  @Patch()
  modificar(@Param('sesionId') sesionId: string, @Param('instructorId') instructorId: string, @Body() datos: { rol: string }) {
    return this.service.modificarRolService(Number(sesionId), Number(instructorId), datos.rol);
  }
}
