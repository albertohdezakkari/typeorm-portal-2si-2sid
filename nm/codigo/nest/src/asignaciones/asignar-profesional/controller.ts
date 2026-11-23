import { Body, Controller, Param, Post } from '@nestjs/common';
import { AsignarProfesionalService } from './service';

@Controller('obras/:obraId/asignaciones')
export class AsignarProfesionalController {
  constructor(private readonly service: AsignarProfesionalService) {}

  @Post()
  asignar(@Param('obraId') obraId: string, @Body() datos: { profesionalId: number; rol: string }) {
    return this.service.asignarProfesionalService(Number(obraId), datos.profesionalId, datos.rol);
  }
}
