import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ModificarRolService } from './service';

@Controller('plantas/:plantaId/asignaciones/:jardineroId')
export class ModificarRolController {
  constructor(private readonly service: ModificarRolService) {}

  @Patch()
  modificar(@Param('plantaId') plantaId: string, @Param('jardineroId') jardineroId: string, @Body() datos: { rol: string }) {
    return this.service.modificarRolService(Number(plantaId), Number(jardineroId), datos.rol);
  }
}
