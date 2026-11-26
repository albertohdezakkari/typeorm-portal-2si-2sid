import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ModificarRolService } from './service';

@Controller('embarcaciones/:embarcacionId/asignaciones/:tripulanteId')
export class ModificarRolController {
  constructor(private readonly service: ModificarRolService) {}

  @Patch()
  modificar(@Param('embarcacionId') embarcacionId: string, @Param('tripulanteId') tripulanteId: string, @Body() datos: { rol: string }) {
    return this.service.modificarRolService(Number(embarcacionId), Number(tripulanteId), datos.rol);
  }
}
