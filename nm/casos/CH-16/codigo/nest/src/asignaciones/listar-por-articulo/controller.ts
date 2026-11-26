import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorArticuloService } from './service';

@Controller('articulos/:articuloId/asignaciones')
export class ListarPorArticuloController {
  constructor(private readonly service: ListarPorArticuloService) {}

  @Get()
  listar(@Param('articuloId') articuloId: string) {
    return this.service.listarAsignacionesPorArticuloService(Number(articuloId));
  }
}
