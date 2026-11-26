import { Controller, Delete, Param, ParseIntPipe, HttpCode } from '@nestjs/common';
import { EliminarService } from './service';

@Controller()
export class EliminarController {
  constructor(private readonly service: EliminarService) {}

  @Delete('animales/:animalId')
  @HttpCode(204)
  async ejecutar(@Param('animalId', ParseIntPipe) animalId: number) {
    return this.service.eliminarAnimalService(animalId);
  }
}
