import { Controller, Delete, Param, ParseIntPipe, HttpCode } from '@nestjs/common';
import { EliminarService } from './service';

@Controller()
export class EliminarController {
  constructor(private readonly service: EliminarService) {}

  @Delete('aulas/:aulaId')
  @HttpCode(204)
  async ejecutar(@Param('aulaId', ParseIntPipe) aulaId: number) {
    return this.service.eliminarAulaService(aulaId);
  }
}
