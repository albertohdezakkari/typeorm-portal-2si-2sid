import { Body, Controller, Param, Post } from '@nestjs/common';
import { AsignarCuidadorService } from './service';

@Controller('animales/:animalId/asignaciones')
export class AsignarCuidadorController {
  constructor(private readonly service: AsignarCuidadorService) {}

  @Post()
  asignar(@Param('animalId') animalId: string, @Body() datos: { cuidadorId: number; rol: string }) {
    return this.service.asignarCuidadorService(Number(animalId), datos.cuidadorId, datos.rol);
  }
}
