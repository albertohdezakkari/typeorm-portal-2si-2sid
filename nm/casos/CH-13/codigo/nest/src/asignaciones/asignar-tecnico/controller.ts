import { Body, Controller, Param, Post } from '@nestjs/common';
import { AsignarTecnicoService } from './service';

@Controller('proyecciones/:proyeccionId/asignaciones')
export class AsignarTecnicoController {
  constructor(private readonly service: AsignarTecnicoService) {}

  @Post()
  asignar(@Param('proyeccionId') proyeccionId: string, @Body() datos: { tecnicoId: number; rol: string }) {
    return this.service.asignarTecnicoService(Number(proyeccionId), datos.tecnicoId, datos.rol);
  }
}
