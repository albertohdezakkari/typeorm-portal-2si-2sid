import { Controller, Delete, Param, ParseIntPipe, HttpCode } from '@nestjs/common';
import { EliminarService } from './service';

@Controller()
export class EliminarController {
  constructor(private readonly service: EliminarService) {}

  @Delete('lotes/:loteId')
  @HttpCode(204)
  async ejecutar(@Param('loteId', ParseIntPipe) loteId: number) {
    return this.service.eliminarLoteService(loteId);
  }
}
