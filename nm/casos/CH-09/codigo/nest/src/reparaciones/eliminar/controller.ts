import { Controller, Delete, Param, ParseIntPipe, HttpCode } from '@nestjs/common';
import { EliminarService } from './service';

@Controller()
export class EliminarController {
  constructor(private readonly service: EliminarService) {}

  @Delete('reparaciones/:reparacionId')
  @HttpCode(204)
  async ejecutar(@Param('reparacionId', ParseIntPipe) reparacionId: number) {
    return this.service.eliminarReparacionService(reparacionId);
  }
}
