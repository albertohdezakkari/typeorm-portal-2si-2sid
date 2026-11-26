import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { ModificarDuracionHorasService } from './service';

@Controller()
export class ModificarDuracionHorasController {
  constructor(private readonly service: ModificarDuracionHorasService) {}

  @Patch('excursiones/:excursionId')
  async ejecutar(@Param('excursionId', ParseIntPipe) excursionId: number,
    @Body() datos: { duracionHoras: number }) {
    return this.service.modificarDuracionHorasService(excursionId, datos.duracionHoras);
  }
}
