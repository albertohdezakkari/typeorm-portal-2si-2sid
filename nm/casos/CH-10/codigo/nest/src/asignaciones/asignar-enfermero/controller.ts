import { Body, Controller, Param, Post } from '@nestjs/common';
import { AsignarEnfermeroService } from './service';

@Controller('habitaciones/:habitacionId/asignaciones')
export class AsignarEnfermeroController {
  constructor(private readonly service: AsignarEnfermeroService) {}

  @Post()
  asignar(@Param('habitacionId') habitacionId: string, @Body() datos: { enfermeroId: number; rol: string }) {
    return this.service.asignarEnfermeroService(Number(habitacionId), datos.enfermeroId, datos.rol);
  }
}
