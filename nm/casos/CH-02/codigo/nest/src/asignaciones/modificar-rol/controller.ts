import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ModificarRolService } from './service';

@Controller('parcelas/:parcelaId/asignaciones/:cultivadorId')
export class ModificarRolController {
  constructor(private readonly service: ModificarRolService) {}

  @Patch()
  modificar(@Param('parcelaId') parcelaId: string, @Param('cultivadorId') cultivadorId: string, @Body() datos: { rol: string }) {
    return this.service.modificarRolService(Number(parcelaId), Number(cultivadorId), datos.rol);
  }
}
