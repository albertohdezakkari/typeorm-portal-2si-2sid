import { Body, Controller, Param, Post, Get, Patch, Delete, HttpCode } from '@nestjs/common';
import { AsignacionesService } from './asignaciones.service';

@Controller()
export class AsignacionesController {
  constructor(private readonly service: AsignacionesService) {}

  @Post('cultivadores')
  crearCultivador(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearCultivador(datos.nombre, datos.apellidos, datos.email);
  }

  @Get('cultivadores')
  listarCultivadores() {
    return this.service.listarCultivadores();
  }

  @Post('parcelas/:parcelaId/asignaciones')
  asignar(@Param('parcelaId') parcelaId: string, @Body() datos: { cultivadorId: number; rol: string }) {
    return this.service.asignarCultivador(Number(parcelaId), datos.cultivadorId, datos.rol);
  }

  @Get('parcelas/:parcelaId/asignaciones')
  listarPorParcela(@Param('parcelaId') parcelaId: string) {
    return this.service.listarPorParcela(Number(parcelaId));
  }

  @Get('cultivadores/:cultivadorId/asignaciones')
  listarPorCultivador(@Param('cultivadorId') cultivadorId: string) {
    return this.service.listarPorCultivador(Number(cultivadorId));
  }

  @Patch('parcelas/:parcelaId/asignaciones/:cultivadorId')
  modificarRol(@Param('parcelaId') parcelaId: string, @Param('cultivadorId') cultivadorId: string,
    @Body() datos: { rol: string }) {
    return this.service.modificarRol(Number(parcelaId), Number(cultivadorId), datos.rol);
  }

  @Delete('parcelas/:parcelaId/asignaciones/:cultivadorId')
  @HttpCode(204)
  eliminar(@Param('parcelaId') parcelaId: string, @Param('cultivadorId') cultivadorId: string) {
    return this.service.eliminarAsignacion(Number(parcelaId), Number(cultivadorId));
  }
}
