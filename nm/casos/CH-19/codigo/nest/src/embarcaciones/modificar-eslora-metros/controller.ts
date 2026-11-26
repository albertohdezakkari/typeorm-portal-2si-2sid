import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { ModificarEsloraMetrosService } from './service';

@Controller()
export class ModificarEsloraMetrosController {
  constructor(private readonly service: ModificarEsloraMetrosService) {}

  @Patch('embarcaciones/:embarcacionId')
  async ejecutar(@Param('embarcacionId', ParseIntPipe) embarcacionId: number,
    @Body() datos: { esloraMetros: number }) {
    return this.service.modificarEsloraMetrosService(embarcacionId, datos.esloraMetros);
  }
}
