import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ModificarRolService } from './service';

@Controller('excursiones/:excursionId/asignaciones/:guiaId')
export class ModificarRolController {
  constructor(private readonly service: ModificarRolService) {}

  @Patch()
  modificar(@Param('excursionId') excursionId: string, @Param('guiaId') guiaId: string, @Body() datos: { rol: string }) {
    return this.service.modificarRolService(Number(excursionId), Number(guiaId), datos.rol);
  }
}
