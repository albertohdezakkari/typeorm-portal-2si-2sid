import { Body, Controller, Get, Post, Delete, HttpCode, Param, Patch, Query } from '@nestjs/common';
import { CosechasService } from './cosechas.service';

@Controller()
export class CosechasController {
  constructor(private readonly service: CosechasService) {}

  @Post('cosechas')
  crear(@Body() datos: { nombre: string; kilos: number; granjaId: number }) {
    return this.service.crearCosecha(datos.nombre, datos.kilos, datos.granjaId);
  }

  @Get('cosechas')
  listar() {
    return this.service.listarCosechas();
  }

  @Delete('cosechas/:cosechaId')
  @HttpCode(204)
  eliminar(@Param('cosechaId') cosechaId: string) {
    return this.service.eliminarCosecha(Number(cosechaId));
  }

  @Patch('cosechas/:cosechaId')
  modificar(@Param('cosechaId') cosechaId: string, @Body() datos: { kilos: number }) {
    return this.service.modificarKilos(Number(cosechaId), datos.kilos);
  }

  @Patch('cosechas/:cosechaId/granja')
  cambiarGranja(@Param('cosechaId') cosechaId: string, @Body() datos: { granjaId: number }) {
    return this.service.cambiarGranja(Number(cosechaId), datos.granjaId);
  }

  @Get('granjas/:granjaId/cosechas')
  consultar(@Param('granjaId') granjaId: string, @Query('minimo') minimo = '0') {
    return this.service.consultarGranja(Number(granjaId), Number(minimo));
  }
}
