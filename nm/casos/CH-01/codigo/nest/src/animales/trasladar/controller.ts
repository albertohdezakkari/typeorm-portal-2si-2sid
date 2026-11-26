import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { TrasladarService } from './service';

@Controller()
export class TrasladarController {
  constructor(private readonly service: TrasladarService) {}

  @Patch('animales/:animalId/refugio')
  async ejecutar(@Param('animalId', ParseIntPipe) animalId: number,
    @Body() datos: { refugioId: number }) {
    return this.service.trasladarAnimalService(animalId, datos.refugioId);
  }
}
