import { Controller, Delete, Param, ParseIntPipe, HttpCode } from '@nestjs/common';
import { EliminarService } from './service';

@Controller()
export class EliminarController {
  constructor(private readonly service: EliminarService) {}

  @Delete('programas/:programaId')
  @HttpCode(204)
  async ejecutar(@Param('programaId', ParseIntPipe) programaId: number) {
    return this.service.eliminarProgramaService(programaId);
  }
}
