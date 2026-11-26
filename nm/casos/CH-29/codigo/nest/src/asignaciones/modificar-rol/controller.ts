import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ModificarRolService } from './service';

@Controller('cosechas/:cosechaId/asignaciones/:agricultorId')
export class ModificarRolController {
  constructor(private readonly service: ModificarRolService) {}

  @Patch()
  modificar(@Param('cosechaId') cosechaId: string, @Param('agricultorId') agricultorId: string, @Body() datos: { rol: string }) {
    return this.service.modificarRolService(Number(cosechaId), Number(agricultorId), datos.rol);
  }
}
