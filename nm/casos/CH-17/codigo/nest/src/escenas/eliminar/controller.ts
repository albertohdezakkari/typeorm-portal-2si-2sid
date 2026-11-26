import { Controller, Delete, Param, ParseIntPipe, HttpCode } from '@nestjs/common';
import { EliminarService } from './service';

@Controller()
export class EliminarController {
  constructor(private readonly service: EliminarService) {}

  @Delete('escenas/:escenaId')
  @HttpCode(204)
  async ejecutar(@Param('escenaId', ParseIntPipe) escenaId: number) {
    return this.service.eliminarEscenaService(escenaId);
  }
}
