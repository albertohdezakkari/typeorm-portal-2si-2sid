import { Body, Controller, Param, Post, Get, Patch, Delete, HttpCode } from '@nestjs/common';
import { AsignacionesService } from './asignaciones.service';

@Controller()
export class AsignacionesController {
  constructor(private readonly service: AsignacionesService) {}

  @Post('comandas/:comandaId/asignaciones')
  asignar(@Param('comandaId') comandaId: string, @Body() datos: { cocineroId: number; rol: string }) {
    return this.service.asignarCocinero(Number(comandaId), datos.cocineroId, datos.rol);
  }

  @Get('comandas/:comandaId/asignaciones')
  listarPorComanda(@Param('comandaId') comandaId: string) {
    return this.service.listarPorComanda(Number(comandaId));
  }

  @Get('cocineros/:cocineroId/asignaciones')
  listarPorCocinero(@Param('cocineroId') cocineroId: string) {
    return this.service.listarPorCocinero(Number(cocineroId));
  }

  @Patch('comandas/:comandaId/asignaciones/:cocineroId')
  modificarRol(@Param('comandaId') comandaId: string, @Param('cocineroId') cocineroId: string,
    @Body() datos: { rol: string }) {
    return this.service.modificarRol(Number(comandaId), Number(cocineroId), datos.rol);
  }

  @Delete('comandas/:comandaId/asignaciones/:cocineroId')
  @HttpCode(204)
  eliminar(@Param('comandaId') comandaId: string, @Param('cocineroId') cocineroId: string) {
    return this.service.eliminarAsignacion(Number(comandaId), Number(cocineroId));
  }
}
