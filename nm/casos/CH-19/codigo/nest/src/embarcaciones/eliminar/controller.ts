import { Controller, Delete, Param, ParseIntPipe, HttpCode } from '@nestjs/common';
import { EliminarService } from './service';

@Controller()
export class EliminarController {
  constructor(private readonly service: EliminarService) {}

  @Delete('embarcaciones/:embarcacionId')
  @HttpCode(204)
  async ejecutar(@Param('embarcacionId', ParseIntPipe) embarcacionId: number) {
    return this.service.eliminarEmbarcacionService(embarcacionId);
  }
}
