import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { TrasladarService } from './service';

@Controller()
export class TrasladarController {
  constructor(private readonly service: TrasladarService) {}

  @Patch('excursiones/:excursionId/agencia')
  async ejecutar(@Param('excursionId', ParseIntPipe) excursionId: number,
    @Body() datos: { agenciaId: number }) {
    return this.service.trasladarExcursionService(excursionId, datos.agenciaId);
  }
}
