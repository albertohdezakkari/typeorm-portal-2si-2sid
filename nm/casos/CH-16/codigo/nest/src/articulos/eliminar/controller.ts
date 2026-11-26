import { Controller, Delete, Param, ParseIntPipe, HttpCode } from '@nestjs/common';
import { EliminarService } from './service';

@Controller()
export class EliminarController {
  constructor(private readonly service: EliminarService) {}

  @Delete('articulos/:articuloId')
  @HttpCode(204)
  async ejecutar(@Param('articuloId', ParseIntPipe) articuloId: number) {
    return this.service.eliminarArticuloService(articuloId);
  }
}
