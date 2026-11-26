import { Body, Controller, Param, Post } from '@nestjs/common';
import { AsignarColaboradorService } from './service';

@Controller('proyectos/:proyectoId/asignaciones')
export class AsignarColaboradorController {
  constructor(private readonly service: AsignarColaboradorService) {}

  @Post()
  asignar(@Param('proyectoId') proyectoId: string, @Body() datos: { colaboradorId: number; rol: string }) {
    return this.service.asignarColaboradorService(Number(proyectoId), datos.colaboradorId, datos.rol);
  }
}
