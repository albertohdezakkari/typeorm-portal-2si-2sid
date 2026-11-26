import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { TrasladarService } from './service';

@Controller()
export class TrasladarController {
  constructor(private readonly service: TrasladarService) {}

  @Patch('actuaciones/:actuacionId/festival')
  async ejecutar(@Param('actuacionId', ParseIntPipe) actuacionId: number,
    @Body() datos: { festivalId: number }) {
    return this.service.trasladarActuacionService(actuacionId, datos.festivalId);
  }
}
