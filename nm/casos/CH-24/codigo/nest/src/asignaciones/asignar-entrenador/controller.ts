import { Body, Controller, Param, Post } from '@nestjs/common';
import { AsignarEntrenadorService } from './service';

@Controller('pistas/:pistaId/asignaciones')
export class AsignarEntrenadorController {
  constructor(private readonly service: AsignarEntrenadorService) {}

  @Post()
  asignar(@Param('pistaId') pistaId: string, @Body() datos: { entrenadorId: number; rol: string }) {
    return this.service.asignarEntrenadorService(Number(pistaId), datos.entrenadorId, datos.rol);
  }
}
