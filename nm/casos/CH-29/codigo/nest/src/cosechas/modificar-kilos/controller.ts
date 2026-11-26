import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { ModificarKilosService } from './service';

@Controller()
export class ModificarKilosController {
  constructor(private readonly service: ModificarKilosService) {}

  @Patch('cosechas/:cosechaId')
  async ejecutar(@Param('cosechaId', ParseIntPipe) cosechaId: number,
    @Body() datos: { kilos: number }) {
    return this.service.modificarKilosService(cosechaId, datos.kilos);
  }
}
