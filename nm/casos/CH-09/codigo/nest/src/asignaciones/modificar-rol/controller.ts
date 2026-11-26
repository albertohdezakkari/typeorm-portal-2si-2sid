import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ModificarRolService } from './service';

@Controller('reparaciones/:reparacionId/asignaciones/:mecanicoId')
export class ModificarRolController {
  constructor(private readonly service: ModificarRolService) {}

  @Patch()
  modificar(@Param('reparacionId') reparacionId: string, @Param('mecanicoId') mecanicoId: string, @Body() datos: { rol: string }) {
    return this.service.modificarRolService(Number(reparacionId), Number(mecanicoId), datos.rol);
  }
}
