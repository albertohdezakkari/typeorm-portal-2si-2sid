import { Body, Controller, Param, Post } from '@nestjs/common';
import { AsignarLocutorService } from './service';

@Controller('programas/:programaId/asignaciones')
export class AsignarLocutorController {
  constructor(private readonly service: AsignarLocutorService) {}

  @Post()
  asignar(@Param('programaId') programaId: string, @Body() datos: { locutorId: number; rol: string }) {
    return this.service.asignarLocutorService(Number(programaId), datos.locutorId, datos.rol);
  }
}
