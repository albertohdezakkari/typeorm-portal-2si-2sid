import { Controller, Delete, Param, ParseIntPipe, HttpCode } from '@nestjs/common';
import { EliminarService } from './service';

@Controller()
export class EliminarController {
  constructor(private readonly service: EliminarService) {}

  @Delete('obras/:obraId')
  @HttpCode(204)
  async ejecutar(@Param('obraId', ParseIntPipe) obraId: number) {
    return this.service.eliminarObraService(obraId);
  }
}
