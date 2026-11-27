import { Body, Controller, Get, Post, Delete, HttpCode, Param, Patch, Query } from '@nestjs/common';
import { ObrasService } from './obras.service';

@Controller()
export class ObrasController {
  constructor(private readonly service: ObrasService) {}

  @Post('obras')
  crear(@Body() datos: { nombre: string; presupuestoEuros: number; ayuntamientoId: number }) {
    return this.service.crearObra(datos.nombre, datos.presupuestoEuros, datos.ayuntamientoId);
  }

  @Get('obras')
  listar() {
    return this.service.listarObras();
  }

  @Delete('obras/:obraId')
  @HttpCode(204)
  eliminar(@Param('obraId') obraId: string) {
    return this.service.eliminarObra(Number(obraId));
  }

  @Patch('obras/:obraId')
  modificar(@Param('obraId') obraId: string, @Body() datos: { presupuestoEuros: number }) {
    return this.service.modificarPresupuesto(Number(obraId), datos.presupuestoEuros);
  }

  @Patch('obras/:obraId/ayuntamiento')
  cambiarAyuntamiento(@Param('obraId') obraId: string, @Body() datos: { ayuntamientoId: number }) {
    return this.service.cambiarAyuntamiento(Number(obraId), datos.ayuntamientoId);
  }

  @Get('ayuntamientos/:ayuntamientoId/obras')
  consultar(@Param('ayuntamientoId') ayuntamientoId: string, @Query('minimo') minimo = '0') {
    return this.service.consultarAyuntamiento(Number(ayuntamientoId), Number(minimo));
  }
}
