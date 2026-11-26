import { Body, Controller, Param, Post } from '@nestjs/common';
import { AsignarPanaderoService } from './service';

@Controller('productos/:productoId/asignaciones')
export class AsignarPanaderoController {
  constructor(private readonly service: AsignarPanaderoService) {}

  @Post()
  asignar(@Param('productoId') productoId: string, @Body() datos: { panaderoId: number; rol: string }) {
    return this.service.asignarPanaderoService(Number(productoId), datos.panaderoId, datos.rol);
  }
}
