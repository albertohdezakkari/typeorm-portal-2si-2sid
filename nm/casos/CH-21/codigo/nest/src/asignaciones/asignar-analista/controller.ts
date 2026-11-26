import { Body, Controller, Param, Post } from '@nestjs/common';
import { AsignarAnalistaService } from './service';

@Controller('muestras/:muestraId/asignaciones')
export class AsignarAnalistaController {
  constructor(private readonly service: AsignarAnalistaService) {}

  @Post()
  asignar(@Param('muestraId') muestraId: string, @Body() datos: { analistaId: number; rol: string }) {
    return this.service.asignarAnalistaService(Number(muestraId), datos.analistaId, datos.rol);
  }
}
