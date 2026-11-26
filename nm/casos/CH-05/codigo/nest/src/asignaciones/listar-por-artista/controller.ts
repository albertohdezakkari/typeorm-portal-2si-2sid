import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorArtistaService } from './service';

@Controller('artistas/:artistaId/asignaciones')
export class ListarPorArtistaController {
  constructor(private readonly service: ListarPorArtistaService) {}

  @Get()
  listar(@Param('artistaId') artistaId: string) {
    return this.service.listarAsignacionesPorArtistaService(Number(artistaId));
  }
}
