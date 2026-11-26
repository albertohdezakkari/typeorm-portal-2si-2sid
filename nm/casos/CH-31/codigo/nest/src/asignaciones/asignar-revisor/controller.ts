import { Body, Controller, Param, Post } from '@nestjs/common';
import { AsignarRevisorService } from './service';

@Controller('documentos/:documentoId/asignaciones')
export class AsignarRevisorController {
  constructor(private readonly service: AsignarRevisorService) {}

  @Post()
  asignar(@Param('documentoId') documentoId: string, @Body() datos: { revisorId: number; rol: string }) {
    return this.service.asignarRevisorService(Number(documentoId), datos.revisorId, datos.rol);
  }
}
