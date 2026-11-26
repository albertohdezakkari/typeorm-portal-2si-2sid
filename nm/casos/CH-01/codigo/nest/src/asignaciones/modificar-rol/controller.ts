import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ModificarRolService } from './service';

@Controller('animales/:animalId/asignaciones/:cuidadorId')
export class ModificarRolController {
  constructor(private readonly service: ModificarRolService) {}

  @Patch()
  modificar(@Param('animalId') animalId: string, @Param('cuidadorId') cuidadorId: string, @Body() datos: { rol: string }) {
    return this.service.modificarRolService(Number(animalId), Number(cuidadorId), datos.rol);
  }
}
