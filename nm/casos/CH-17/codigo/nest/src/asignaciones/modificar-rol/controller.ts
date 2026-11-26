import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ModificarRolService } from './service';

@Controller('escenas/:escenaId/asignaciones/:actorId')
export class ModificarRolController {
  constructor(private readonly service: ModificarRolService) {}

  @Patch()
  modificar(@Param('escenaId') escenaId: string, @Param('actorId') actorId: string, @Body() datos: { rol: string }) {
    return this.service.modificarRolService(Number(escenaId), Number(actorId), datos.rol);
  }
}
