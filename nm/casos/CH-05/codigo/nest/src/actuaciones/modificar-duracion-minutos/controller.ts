import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { ModificarDuracionMinutosService } from './service';

@Controller()
export class ModificarDuracionMinutosController {
  constructor(private readonly service: ModificarDuracionMinutosService) {}

  @Patch('actuaciones/:actuacionId')
  async ejecutar(@Param('actuacionId', ParseIntPipe) actuacionId: number,
    @Body() datos: { duracionMinutos: number }) {
    return this.service.modificarDuracionMinutosService(actuacionId, datos.duracionMinutos);
  }
}
