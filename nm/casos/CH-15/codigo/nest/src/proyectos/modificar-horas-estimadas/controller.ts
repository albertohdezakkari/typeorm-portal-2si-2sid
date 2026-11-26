import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { ModificarHorasEstimadasService } from './service';

@Controller()
export class ModificarHorasEstimadasController {
  constructor(private readonly service: ModificarHorasEstimadasService) {}

  @Patch('proyectos/:proyectoId')
  async ejecutar(@Param('proyectoId', ParseIntPipe) proyectoId: number,
    @Body() datos: { horasEstimadas: number }) {
    return this.service.modificarHorasEstimadasService(proyectoId, datos.horasEstimadas);
  }
}
