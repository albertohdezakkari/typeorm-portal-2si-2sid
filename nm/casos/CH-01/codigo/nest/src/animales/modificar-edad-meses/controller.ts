import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { ModificarEdadMesesService } from './service';

@Controller()
export class ModificarEdadMesesController {
  constructor(private readonly service: ModificarEdadMesesService) {}

  @Patch('animales/:animalId')
  async ejecutar(@Param('animalId', ParseIntPipe) animalId: number,
    @Body() datos: { edadMeses: number }) {
    return this.service.modificarEdadMesesService(animalId, datos.edadMeses);
  }
}
