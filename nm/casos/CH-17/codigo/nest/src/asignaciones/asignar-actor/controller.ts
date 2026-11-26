import { Body, Controller, Param, Post } from '@nestjs/common';
import { AsignarActorService } from './service';

@Controller('escenas/:escenaId/asignaciones')
export class AsignarActorController {
  constructor(private readonly service: AsignarActorService) {}

  @Post()
  asignar(@Param('escenaId') escenaId: string, @Body() datos: { actorId: number; rol: string }) {
    return this.service.asignarActorService(Number(escenaId), datos.actorId, datos.rol);
  }
}
