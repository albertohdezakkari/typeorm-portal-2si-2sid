import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorProductoService } from './service';

@Controller('productos/:productoId/asignaciones')
export class ListarPorProductoController {
  constructor(private readonly service: ListarPorProductoService) {}

  @Get()
  listar(@Param('productoId') productoId: string) {
    return this.service.listarAsignacionesPorProductoService(Number(productoId));
  }
}
