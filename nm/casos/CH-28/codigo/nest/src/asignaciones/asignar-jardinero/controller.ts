import { Body, Controller, Param, Post } from '@nestjs/common';
import { AsignarJardineroService } from './service';

@Controller('plantas/:plantaId/asignaciones')
export class AsignarJardineroController {
  constructor(private readonly service: AsignarJardineroService) {}

  @Post()
  asignar(@Param('plantaId') plantaId: string, @Body() datos: { jardineroId: number; rol: string }) {
    return this.service.asignarJardineroService(Number(plantaId), datos.jardineroId, datos.rol);
  }
}
