import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ModificarRolService } from './service';

@Controller('reservas/:reservaId/asignaciones/:huespedId')
export class ModificarRolController {
  constructor(private readonly service: ModificarRolService) {}

  @Patch()
  modificar(@Param('reservaId') reservaId: string, @Param('huespedId') huespedId: string, @Body() datos: { rol: string }) {
    return this.service.modificarRolService(Number(reservaId), Number(huespedId), datos.rol);
  }
}
