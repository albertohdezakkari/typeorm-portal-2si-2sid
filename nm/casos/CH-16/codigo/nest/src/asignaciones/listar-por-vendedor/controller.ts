import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorVendedorService } from './service';

@Controller('vendedores/:vendedorId/asignaciones')
export class ListarPorVendedorController {
  constructor(private readonly service: ListarPorVendedorService) {}

  @Get()
  listar(@Param('vendedorId') vendedorId: string) {
    return this.service.listarAsignacionesPorVendedorService(Number(vendedorId));
  }
}
