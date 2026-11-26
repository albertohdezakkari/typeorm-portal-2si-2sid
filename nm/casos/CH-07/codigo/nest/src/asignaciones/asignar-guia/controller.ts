import { Body, Controller, Param, Post } from '@nestjs/common';
import { AsignarGuiaService } from './service';

@Controller('excursiones/:excursionId/asignaciones')
export class AsignarGuiaController {
  constructor(private readonly service: AsignarGuiaService) {}

  @Post()
  asignar(@Param('excursionId') excursionId: string, @Body() datos: { guiaId: number; rol: string }) {
    return this.service.asignarGuiaService(Number(excursionId), datos.guiaId, datos.rol);
  }
}
