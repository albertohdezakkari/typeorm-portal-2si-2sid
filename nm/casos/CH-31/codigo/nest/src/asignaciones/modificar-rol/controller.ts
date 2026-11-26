import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ModificarRolService } from './service';

@Controller('documentos/:documentoId/asignaciones/:revisorId')
export class ModificarRolController {
  constructor(private readonly service: ModificarRolService) {}

  @Patch()
  modificar(@Param('documentoId') documentoId: string, @Param('revisorId') revisorId: string, @Body() datos: { rol: string }) {
    return this.service.modificarRolService(Number(documentoId), Number(revisorId), datos.rol);
  }
}
