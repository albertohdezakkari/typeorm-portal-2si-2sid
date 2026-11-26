import { Body, Controller, Param, Post } from '@nestjs/common';
import { AsignarDocenteService } from './service';

@Controller('aulas/:aulaId/asignaciones')
export class AsignarDocenteController {
  constructor(private readonly service: AsignarDocenteService) {}

  @Post()
  asignar(@Param('aulaId') aulaId: string, @Body() datos: { docenteId: number; rol: string }) {
    return this.service.asignarDocenteService(Number(aulaId), datos.docenteId, datos.rol);
  }
}
