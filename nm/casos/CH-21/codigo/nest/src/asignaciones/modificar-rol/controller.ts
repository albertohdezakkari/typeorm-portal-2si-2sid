import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ModificarRolService } from './service';

@Controller('muestras/:muestraId/asignaciones/:analistaId')
export class ModificarRolController {
  constructor(private readonly service: ModificarRolService) {}

  @Patch()
  modificar(@Param('muestraId') muestraId: string, @Param('analistaId') analistaId: string, @Body() datos: { rol: string }) {
    return this.service.modificarRolService(Number(muestraId), Number(analistaId), datos.rol);
  }
}
