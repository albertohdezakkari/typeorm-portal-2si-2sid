import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorFuncionService } from './service';

@Controller('funciones/:funcionId/asignaciones')
export class ListarPorFuncionController {
  constructor(private readonly service: ListarPorFuncionService) {}

  @Get()
  listar(@Param('funcionId') funcionId: string) {
    return this.service.listarAsignacionesPorFuncionService(Number(funcionId));
  }
}
