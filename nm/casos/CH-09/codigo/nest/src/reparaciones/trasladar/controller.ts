import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { TrasladarService } from './service';

@Controller()
export class TrasladarController {
  constructor(private readonly service: TrasladarService) {}

  @Patch('reparaciones/:reparacionId/taller')
  async ejecutar(@Param('reparacionId', ParseIntPipe) reparacionId: number,
    @Body() datos: { tallerId: number }) {
    return this.service.trasladarReparacionService(reparacionId, datos.tallerId);
  }
}
