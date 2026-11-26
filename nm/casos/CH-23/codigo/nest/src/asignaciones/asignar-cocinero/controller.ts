import { Body, Controller, Param, Post } from '@nestjs/common';
import { AsignarCocineroService } from './service';

@Controller('comandas/:comandaId/asignaciones')
export class AsignarCocineroController {
  constructor(private readonly service: AsignarCocineroService) {}

  @Post()
  asignar(@Param('comandaId') comandaId: string, @Body() datos: { cocineroId: number; rol: string }) {
    return this.service.asignarCocineroService(Number(comandaId), datos.cocineroId, datos.rol);
  }
}
