import { Controller, Delete, Param, ParseIntPipe, HttpCode } from '@nestjs/common';
import { EliminarService } from './service';

@Controller()
export class EliminarController {
  constructor(private readonly service: EliminarService) {}

  @Delete('excursiones/:excursionId')
  @HttpCode(204)
  async ejecutar(@Param('excursionId', ParseIntPipe) excursionId: number) {
    return this.service.eliminarExcursionService(excursionId);
  }
}
