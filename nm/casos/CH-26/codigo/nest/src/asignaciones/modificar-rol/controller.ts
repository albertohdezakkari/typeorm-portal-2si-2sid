import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ModificarRolService } from './service';

@Controller('aulas/:aulaId/asignaciones/:docenteId')
export class ModificarRolController {
  constructor(private readonly service: ModificarRolService) {}

  @Patch()
  modificar(@Param('aulaId') aulaId: string, @Param('docenteId') docenteId: string, @Body() datos: { rol: string }) {
    return this.service.modificarRolService(Number(aulaId), Number(docenteId), datos.rol);
  }
}
