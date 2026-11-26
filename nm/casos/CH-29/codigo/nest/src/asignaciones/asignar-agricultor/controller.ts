import { Body, Controller, Param, Post } from '@nestjs/common';
import { AsignarAgricultorService } from './service';

@Controller('cosechas/:cosechaId/asignaciones')
export class AsignarAgricultorController {
  constructor(private readonly service: AsignarAgricultorService) {}

  @Post()
  asignar(@Param('cosechaId') cosechaId: string, @Body() datos: { agricultorId: number; rol: string }) {
    return this.service.asignarAgricultorService(Number(cosechaId), datos.agricultorId, datos.rol);
  }
}
