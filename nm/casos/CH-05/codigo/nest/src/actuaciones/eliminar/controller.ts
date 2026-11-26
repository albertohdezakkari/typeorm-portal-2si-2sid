import { Controller, Delete, Param, ParseIntPipe, HttpCode } from '@nestjs/common';
import { EliminarService } from './service';

@Controller()
export class EliminarController {
  constructor(private readonly service: EliminarService) {}

  @Delete('actuaciones/:actuacionId')
  @HttpCode(204)
  async ejecutar(@Param('actuacionId', ParseIntPipe) actuacionId: number) {
    return this.service.eliminarActuacionService(actuacionId);
  }
}
