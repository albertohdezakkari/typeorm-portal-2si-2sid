import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { ModificarSuperficieService } from './service';

@Controller()
export class ModificarSuperficieController {
  constructor(private readonly service: ModificarSuperficieService) {}

  @Patch('parcelas/:parcelaId')
  async ejecutar(@Param('parcelaId', ParseIntPipe) parcelaId: number,
    @Body() datos: { superficieM2: number }) {
    return this.service.modificarSuperficieService(parcelaId, datos.superficieM2);
  }
}
