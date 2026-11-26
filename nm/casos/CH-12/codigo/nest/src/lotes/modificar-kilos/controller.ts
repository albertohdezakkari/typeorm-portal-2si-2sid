import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { ModificarKilosService } from './service';

@Controller()
export class ModificarKilosController {
  constructor(private readonly service: ModificarKilosService) {}

  @Patch('lotes/:loteId')
  async ejecutar(@Param('loteId', ParseIntPipe) loteId: number,
    @Body() datos: { kilos: number }) {
    return this.service.modificarKilosService(loteId, datos.kilos);
  }
}
