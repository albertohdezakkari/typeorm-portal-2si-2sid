import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { TrasladarService } from './service';

@Controller()
export class TrasladarController {
  constructor(private readonly service: TrasladarService) {}

  @Patch('cosechas/:cosechaId/granja')
  async ejecutar(@Param('cosechaId', ParseIntPipe) cosechaId: number,
    @Body() datos: { granjaId: number }) {
    return this.service.trasladarCosechaService(cosechaId, datos.granjaId);
  }
}
