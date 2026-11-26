import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ModificarRolService } from './service';

@Controller('comandas/:comandaId/asignaciones/:cocineroId')
export class ModificarRolController {
  constructor(private readonly service: ModificarRolService) {}

  @Patch()
  modificar(@Param('comandaId') comandaId: string, @Param('cocineroId') cocineroId: string, @Body() datos: { rol: string }) {
    return this.service.modificarRolService(Number(comandaId), Number(cocineroId), datos.rol);
  }
}
