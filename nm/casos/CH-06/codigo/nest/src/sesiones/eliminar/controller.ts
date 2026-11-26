import { Controller, Delete, Param, ParseIntPipe, HttpCode } from '@nestjs/common';
import { EliminarService } from './service';

@Controller()
export class EliminarController {
  constructor(private readonly service: EliminarService) {}

  @Delete('sesiones/:sesionId')
  @HttpCode(204)
  async ejecutar(@Param('sesionId', ParseIntPipe) sesionId: number) {
    return this.service.eliminarSesionService(sesionId);
  }
}
