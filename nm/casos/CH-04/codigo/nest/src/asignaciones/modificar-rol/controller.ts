import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ModificarRolService } from './service';

@Controller('publicaciones/:publicacionId/asignaciones/:autorId')
export class ModificarRolController {
  constructor(private readonly service: ModificarRolService) {}

  @Patch()
  modificar(@Param('publicacionId') publicacionId: string, @Param('autorId') autorId: string, @Body() datos: { rol: string }) {
    return this.service.modificarRolService(Number(publicacionId), Number(autorId), datos.rol);
  }
}
