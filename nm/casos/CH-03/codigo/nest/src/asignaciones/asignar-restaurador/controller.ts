import { Body, Controller, Param, Post } from '@nestjs/common';
import { AsignarRestauradorService } from './service';

@Controller('piezas/:piezaId/asignaciones')
export class AsignarRestauradorController {
  constructor(private readonly service: AsignarRestauradorService) {}

  @Post()
  asignar(@Param('piezaId') piezaId: string, @Body() datos: { restauradorId: number; rol: string }) {
    return this.service.asignarRestauradorService(Number(piezaId), datos.restauradorId, datos.rol);
  }
}
