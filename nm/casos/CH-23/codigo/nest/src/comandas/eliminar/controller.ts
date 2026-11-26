import { Controller, Delete, Param, ParseIntPipe, HttpCode } from '@nestjs/common';
import { EliminarService } from './service';

@Controller()
export class EliminarController {
  constructor(private readonly service: EliminarService) {}

  @Delete('comandas/:comandaId')
  @HttpCode(204)
  async ejecutar(@Param('comandaId', ParseIntPipe) comandaId: number) {
    return this.service.eliminarComandaService(comandaId);
  }
}
