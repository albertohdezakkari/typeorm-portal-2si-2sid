import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ModificarRolService } from './service';

@Controller('programas/:programaId/asignaciones/:locutorId')
export class ModificarRolController {
  constructor(private readonly service: ModificarRolService) {}

  @Patch()
  modificar(@Param('programaId') programaId: string, @Param('locutorId') locutorId: string, @Body() datos: { rol: string }) {
    return this.service.modificarRolService(Number(programaId), Number(locutorId), datos.rol);
  }
}
