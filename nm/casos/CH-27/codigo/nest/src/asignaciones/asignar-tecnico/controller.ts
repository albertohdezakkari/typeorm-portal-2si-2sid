import { Body, Controller, Param, Post } from '@nestjs/common';
import { AsignarTecnicoService } from './service';

@Controller('plazas/:plazaId/asignaciones')
export class AsignarTecnicoController {
  constructor(private readonly service: AsignarTecnicoService) {}

  @Post()
  asignar(@Param('plazaId') plazaId: string, @Body() datos: { tecnicoId: number; rol: string }) {
    return this.service.asignarTecnicoService(Number(plazaId), datos.tecnicoId, datos.rol);
  }
}
