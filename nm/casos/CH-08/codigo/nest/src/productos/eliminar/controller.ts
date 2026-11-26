import { Controller, Delete, Param, ParseIntPipe, HttpCode } from '@nestjs/common';
import { EliminarService } from './service';

@Controller()
export class EliminarController {
  constructor(private readonly service: EliminarService) {}

  @Delete('productos/:productoId')
  @HttpCode(204)
  async ejecutar(@Param('productoId', ParseIntPipe) productoId: number) {
    return this.service.eliminarProductoService(productoId);
  }
}
