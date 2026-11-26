import { Body, Controller, Param, Post } from '@nestjs/common';
import { AsignarInterpreteService } from './service';

@Controller('funciones/:funcionId/asignaciones')
export class AsignarInterpreteController {
  constructor(private readonly service: AsignarInterpreteService) {}

  @Post()
  asignar(@Param('funcionId') funcionId: string, @Body() datos: { interpreteId: number; rol: string }) {
    return this.service.asignarInterpreteService(Number(funcionId), datos.interpreteId, datos.rol);
  }
}
