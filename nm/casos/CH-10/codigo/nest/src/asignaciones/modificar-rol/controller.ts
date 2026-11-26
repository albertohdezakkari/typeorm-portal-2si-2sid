import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ModificarRolService } from './service';

@Controller('habitaciones/:habitacionId/asignaciones/:enfermeroId')
export class ModificarRolController {
  constructor(private readonly service: ModificarRolService) {}

  @Patch()
  modificar(@Param('habitacionId') habitacionId: string, @Param('enfermeroId') enfermeroId: string, @Body() datos: { rol: string }) {
    return this.service.modificarRolService(Number(habitacionId), Number(enfermeroId), datos.rol);
  }
}
