import { Body, Controller, Param, Post } from '@nestjs/common';
import { AsignarTripulanteService } from './service';

@Controller('embarcaciones/:embarcacionId/asignaciones')
export class AsignarTripulanteController {
  constructor(private readonly service: AsignarTripulanteService) {}

  @Post()
  asignar(@Param('embarcacionId') embarcacionId: string, @Body() datos: { tripulanteId: number; rol: string }) {
    return this.service.asignarTripulanteService(Number(embarcacionId), datos.tripulanteId, datos.rol);
  }
}
