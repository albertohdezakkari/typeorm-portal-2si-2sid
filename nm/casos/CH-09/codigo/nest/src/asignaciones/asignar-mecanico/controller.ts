import { Body, Controller, Param, Post } from '@nestjs/common';
import { AsignarMecanicoService } from './service';

@Controller('reparaciones/:reparacionId/asignaciones')
export class AsignarMecanicoController {
  constructor(private readonly service: AsignarMecanicoService) {}

  @Post()
  asignar(@Param('reparacionId') reparacionId: string, @Body() datos: { mecanicoId: number; rol: string }) {
    return this.service.asignarMecanicoService(Number(reparacionId), datos.mecanicoId, datos.rol);
  }
}
