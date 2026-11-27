import { Body, Controller, Get, Post, Delete, HttpCode, Param, Patch, Query } from '@nestjs/common';
import { LotesService } from './lotes.service';

@Controller()
export class LotesController {
  constructor(private readonly service: LotesService) {}

  @Post('lotes')
  crear(@Body() datos: { nombre: string; kilos: number; cooperativaId: number }) {
    return this.service.crearLote(datos.nombre, datos.kilos, datos.cooperativaId);
  }

  @Get('lotes')
  listar() {
    return this.service.listarLotes();
  }

  @Delete('lotes/:loteId')
  @HttpCode(204)
  eliminar(@Param('loteId') loteId: string) {
    return this.service.eliminarLote(Number(loteId));
  }

  @Patch('lotes/:loteId')
  modificar(@Param('loteId') loteId: string, @Body() datos: { kilos: number }) {
    return this.service.modificarKilos(Number(loteId), datos.kilos);
  }

  @Patch('lotes/:loteId/cooperativa')
  cambiarCooperativa(@Param('loteId') loteId: string, @Body() datos: { cooperativaId: number }) {
    return this.service.cambiarCooperativa(Number(loteId), datos.cooperativaId);
  }

  @Get('cooperativas/:cooperativaId/lotes')
  consultar(@Param('cooperativaId') cooperativaId: string, @Query('minimo') minimo = '0') {
    return this.service.consultarCooperativa(Number(cooperativaId), Number(minimo));
  }
}
