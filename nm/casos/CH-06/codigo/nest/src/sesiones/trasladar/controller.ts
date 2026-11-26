import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { TrasladarService } from './service';

@Controller()
export class TrasladarController {
  constructor(private readonly service: TrasladarService) {}

  @Patch('sesiones/:sesionId/gimnasio')
  async ejecutar(@Param('sesionId', ParseIntPipe) sesionId: number,
    @Body() datos: { gimnasioId: number }) {
    return this.service.trasladarSesionService(sesionId, datos.gimnasioId);
  }
}
