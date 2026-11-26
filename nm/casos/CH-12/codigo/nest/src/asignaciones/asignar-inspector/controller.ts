import { Body, Controller, Param, Post } from '@nestjs/common';
import { AsignarInspectorService } from './service';

@Controller('lotes/:loteId/asignaciones')
export class AsignarInspectorController {
  constructor(private readonly service: AsignarInspectorService) {}

  @Post()
  asignar(@Param('loteId') loteId: string, @Body() datos: { inspectorId: number; rol: string }) {
    return this.service.asignarInspectorService(Number(loteId), datos.inspectorId, datos.rol);
  }
}
