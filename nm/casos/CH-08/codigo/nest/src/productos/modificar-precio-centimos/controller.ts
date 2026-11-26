import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { ModificarPrecioCentimosService } from './service';

@Controller()
export class ModificarPrecioCentimosController {
  constructor(private readonly service: ModificarPrecioCentimosService) {}

  @Patch('productos/:productoId')
  async ejecutar(@Param('productoId', ParseIntPipe) productoId: number,
    @Body() datos: { precioCentimos: number }) {
    return this.service.modificarPrecioCentimosService(productoId, datos.precioCentimos);
  }
}
