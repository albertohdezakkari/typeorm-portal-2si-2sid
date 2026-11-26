import { Body, Controller, Param, Post } from '@nestjs/common';
import { AsignarInstructorService } from './service';

@Controller('sesiones/:sesionId/asignaciones')
export class AsignarInstructorController {
  constructor(private readonly service: AsignarInstructorService) {}

  @Post()
  asignar(@Param('sesionId') sesionId: string, @Body() datos: { instructorId: number; rol: string }) {
    return this.service.asignarInstructorService(Number(sesionId), datos.instructorId, datos.rol);
  }
}
