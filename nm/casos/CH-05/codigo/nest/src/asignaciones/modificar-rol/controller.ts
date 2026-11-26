import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ModificarRolService } from './service';

@Controller('actuaciones/:actuacionId/asignaciones/:artistaId')
export class ModificarRolController {
  constructor(private readonly service: ModificarRolService) {}

  @Patch()
  modificar(@Param('actuacionId') actuacionId: string, @Param('artistaId') artistaId: string, @Body() datos: { rol: string }) {
    return this.service.modificarRolService(Number(actuacionId), Number(artistaId), datos.rol);
  }
}
