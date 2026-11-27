import { Body, Controller, Get, Post, Delete, HttpCode, Param, Patch, Query } from '@nestjs/common';
import { ParcelasService } from './parcelas.service';

@Controller()
export class ParcelasController {
  constructor(private readonly service: ParcelasService) {}

  @Post('parcelas')
  crear(@Body() datos: { nombre: string; superficieM2: number; huertoId: number }) {
    return this.service.crearParcela(datos.nombre, datos.superficieM2, datos.huertoId);
  }

  @Get('parcelas')
  listar() {
    return this.service.listarParcelas();
  }

  @Delete('parcelas/:parcelaId')
  @HttpCode(204)
  eliminar(@Param('parcelaId') parcelaId: string) {
    return this.service.eliminarParcela(Number(parcelaId));
  }

  @Patch('parcelas/:parcelaId')
  modificar(@Param('parcelaId') parcelaId: string, @Body() datos: { superficieM2: number }) {
    return this.service.modificarSuperficieM2(Number(parcelaId), datos.superficieM2);
  }

  @Patch('parcelas/:parcelaId/huerto')
  cambiarHuerto(@Param('parcelaId') parcelaId: string, @Body() datos: { huertoId: number }) {
    return this.service.cambiarHuerto(Number(parcelaId), datos.huertoId);
  }

  @Get('huertos/:huertoId/parcelas')
  consultar(@Param('huertoId') huertoId: string, @Query('minimo') minimo = '0') {
    return this.service.consultarHuerto(Number(huertoId), Number(minimo));
  }
}
