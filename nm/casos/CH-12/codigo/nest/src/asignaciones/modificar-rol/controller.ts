import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ModificarRolService } from './service';

@Controller('lotes/:loteId/asignaciones/:inspectorId')
export class ModificarRolController {
  constructor(private readonly service: ModificarRolService) {}

  @Patch()
  modificar(@Param('loteId') loteId: string, @Param('inspectorId') inspectorId: string, @Body() datos: { rol: string }) {
    return this.service.modificarRolService(Number(loteId), Number(inspectorId), datos.rol);
  }
}
