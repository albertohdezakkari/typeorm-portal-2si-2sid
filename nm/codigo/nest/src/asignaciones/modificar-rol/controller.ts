import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ModificarRolService } from './service';

@Controller('obras/:obraId/asignaciones/:profesionalId')
export class ModificarRolController {
  constructor(private readonly service: ModificarRolService) {}

  @Patch()
  modificar(@Param('obraId') obraId: string, @Param('profesionalId') profesionalId: string, @Body() datos: { rol: string }) {
    return this.service.modificarRolService(Number(obraId), Number(profesionalId), datos.rol);
  }
}
