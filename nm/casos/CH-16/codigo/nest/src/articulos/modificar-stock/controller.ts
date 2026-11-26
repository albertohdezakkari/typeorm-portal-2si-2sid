import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { ModificarStockService } from './service';

@Controller()
export class ModificarStockController {
  constructor(private readonly service: ModificarStockService) {}

  @Patch('articulos/:articuloId')
  async ejecutar(@Param('articuloId', ParseIntPipe) articuloId: number,
    @Body() datos: { stock: number }) {
    return this.service.modificarStockService(articuloId, datos.stock);
  }
}
