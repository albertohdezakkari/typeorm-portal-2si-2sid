import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ModificarRolService } from './service';

@Controller('zonas/:zonaId/asignaciones/:jardineroId')
export class ModificarRolController {
  constructor(private readonly service: ModificarRolService) {}

  @Patch()
  modificar(@Param('zonaId') zonaId: string, @Param('jardineroId') jardineroId: string, @Body() datos: { rol: string }) {
    return this.service.modificarRolService(Number(zonaId), Number(jardineroId), datos.rol);
  }
}
