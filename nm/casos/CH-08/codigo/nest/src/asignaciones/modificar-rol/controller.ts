import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ModificarRolService } from './service';

@Controller('productos/:productoId/asignaciones/:panaderoId')
export class ModificarRolController {
  constructor(private readonly service: ModificarRolService) {}

  @Patch()
  modificar(@Param('productoId') productoId: string, @Param('panaderoId') panaderoId: string, @Body() datos: { rol: string }) {
    return this.service.modificarRolService(Number(productoId), Number(panaderoId), datos.rol);
  }
}
