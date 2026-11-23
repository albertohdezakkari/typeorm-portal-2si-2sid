import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { TrasladarService } from './service';

@Controller()
export class TrasladarController {
  constructor(private readonly service: TrasladarService) {}

  @Patch('obras/:obraId/ayuntamiento')
  async ejecutar(@Param('obraId', ParseIntPipe) obraId: number,
    @Body() datos: { ayuntamientoId: number }) {
    return this.service.trasladarObraService(obraId, datos.ayuntamientoId);
  }
}
