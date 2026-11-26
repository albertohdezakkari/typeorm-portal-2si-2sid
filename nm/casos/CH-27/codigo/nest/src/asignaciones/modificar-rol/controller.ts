import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ModificarRolService } from './service';

@Controller('plazas/:plazaId/asignaciones/:tecnicoId')
export class ModificarRolController {
  constructor(private readonly service: ModificarRolService) {}

  @Patch()
  modificar(@Param('plazaId') plazaId: string, @Param('tecnicoId') tecnicoId: string, @Body() datos: { rol: string }) {
    return this.service.modificarRolService(Number(plazaId), Number(tecnicoId), datos.rol);
  }
}
