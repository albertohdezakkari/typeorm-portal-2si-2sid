import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { TrasladarService } from './service';

@Controller()
export class TrasladarController {
  constructor(private readonly service: TrasladarService) {}

  @Patch('articulos/:articuloId/tienda')
  async ejecutar(@Param('articuloId', ParseIntPipe) articuloId: number,
    @Body() datos: { tiendaId: number }) {
    return this.service.trasladarArticuloService(articuloId, datos.tiendaId);
  }
}
