import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { EliminarAsignacionService } from './service';

@Controller('animales/:animalId/asignaciones/:cuidadorId')
export class EliminarAsignacionController {
  constructor(private readonly service: EliminarAsignacionService) {}

  @Delete()
  @HttpCode(204)
  eliminar(@Param('animalId') animalId: string, @Param('cuidadorId') cuidadorId: string) {
    return this.service.eliminarAsignacionService(Number(animalId), Number(cuidadorId));
  }
}
