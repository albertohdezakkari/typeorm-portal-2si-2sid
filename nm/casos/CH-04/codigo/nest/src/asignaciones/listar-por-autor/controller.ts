import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorAutorService } from './service';

@Controller('autores/:autorId/asignaciones')
export class ListarPorAutorController {
  constructor(private readonly service: ListarPorAutorService) {}

  @Get()
  listar(@Param('autorId') autorId: string) {
    return this.service.listarAsignacionesPorAutorService(Number(autorId));
  }
}
