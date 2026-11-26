import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ModificarRolService } from './service';

@Controller('funciones/:funcionId/asignaciones/:interpreteId')
export class ModificarRolController {
  constructor(private readonly service: ModificarRolService) {}

  @Patch()
  modificar(@Param('funcionId') funcionId: string, @Param('interpreteId') interpreteId: string, @Body() datos: { rol: string }) {
    return this.service.modificarRolService(Number(funcionId), Number(interpreteId), datos.rol);
  }
}
