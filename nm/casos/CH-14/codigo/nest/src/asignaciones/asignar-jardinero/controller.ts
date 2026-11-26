import { Body, Controller, Param, Post } from '@nestjs/common';
import { AsignarJardineroService } from './service';

@Controller('zonas/:zonaId/asignaciones')
export class AsignarJardineroController {
  constructor(private readonly service: AsignarJardineroService) {}

  @Post()
  asignar(@Param('zonaId') zonaId: string, @Body() datos: { jardineroId: number; rol: string }) {
    return this.service.asignarJardineroService(Number(zonaId), datos.jardineroId, datos.rol);
  }
}
