import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorInstructorService } from './service';

@Controller('instructores/:instructorId/asignaciones')
export class ListarPorInstructorController {
  constructor(private readonly service: ListarPorInstructorService) {}

  @Get()
  listar(@Param('instructorId') instructorId: string) {
    return this.service.listarAsignacionesPorInstructorService(Number(instructorId));
  }
}
