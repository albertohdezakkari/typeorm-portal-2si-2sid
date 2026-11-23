import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorObraService } from './service';

@Controller('obras/:obraId/asignaciones')
export class ListarPorObraController {
  constructor(private readonly service: ListarPorObraService) {}

  @Get()
  listar(@Param('obraId') obraId: string) {
    return this.service.listarAsignacionesPorObraService(Number(obraId));
  }
}
