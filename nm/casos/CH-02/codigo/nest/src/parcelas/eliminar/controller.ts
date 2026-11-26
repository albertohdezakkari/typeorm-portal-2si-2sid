import { Controller, Delete, Param, ParseIntPipe, HttpCode } from '@nestjs/common';
import { EliminarService } from './service';

@Controller()
export class EliminarController {
  constructor(private readonly service: EliminarService) {}

  @Delete('parcelas/:parcelaId')
  @HttpCode(204)
  async ejecutar(@Param('parcelaId', ParseIntPipe) parcelaId: number) {
    return this.service.eliminarParcelaService(parcelaId);
  }
}
