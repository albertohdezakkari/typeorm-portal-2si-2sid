import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { TrasladarService } from './service';

@Controller()
export class TrasladarController {
  constructor(private readonly service: TrasladarService) {}

  @Patch('productos/:productoId/panaderia')
  async ejecutar(@Param('productoId', ParseIntPipe) productoId: number,
    @Body() datos: { panaderiaId: number }) {
    return this.service.trasladarProductoService(productoId, datos.panaderiaId);
  }
}
