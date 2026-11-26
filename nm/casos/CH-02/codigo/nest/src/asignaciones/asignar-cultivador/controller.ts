import { Body, Controller, Param, Post } from '@nestjs/common';
import { AsignarCultivadorService } from './service';

@Controller('parcelas/:parcelaId/asignaciones')
export class AsignarCultivadorController {
  constructor(private readonly service: AsignarCultivadorService) {}

  @Post()
  asignar(@Param('parcelaId') parcelaId: string, @Body() datos: { cultivadorId: number; rol: string }) {
    return this.service.asignarCultivadorService(Number(parcelaId), datos.cultivadorId, datos.rol);
  }
}
