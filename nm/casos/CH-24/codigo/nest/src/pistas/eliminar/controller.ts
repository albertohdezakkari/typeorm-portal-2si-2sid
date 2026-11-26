import { Controller, Delete, Param, ParseIntPipe, HttpCode } from '@nestjs/common';
import { EliminarService } from './service';

@Controller()
export class EliminarController {
  constructor(private readonly service: EliminarService) {}

  @Delete('pistas/:pistaId')
  @HttpCode(204)
  async ejecutar(@Param('pistaId', ParseIntPipe) pistaId: number) {
    return this.service.eliminarPistaService(pistaId);
  }
}
