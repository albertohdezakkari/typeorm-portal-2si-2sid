import { Body, Controller, Param, Post, Get, Patch, Delete, HttpCode } from '@nestjs/common';
import { AsignacionesService } from './asignaciones.service';

@Controller()
export class AsignacionesController {
  constructor(private readonly service: AsignacionesService) {}

  @Post('reservas/:reservaId/asignaciones')
  asignar(@Param('reservaId') reservaId: string, @Body() datos: { huespedId: number; rol: string }) {
    return this.service.asignarHuesped(Number(reservaId), datos.huespedId, datos.rol);
  }

  @Get('reservas/:reservaId/asignaciones')
  listarPorReserva(@Param('reservaId') reservaId: string) {
    return this.service.listarPorReserva(Number(reservaId));
  }

  @Get('huespedes/:huespedId/asignaciones')
  listarPorHuesped(@Param('huespedId') huespedId: string) {
    return this.service.listarPorHuesped(Number(huespedId));
  }

  @Patch('reservas/:reservaId/asignaciones/:huespedId')
  modificarRol(@Param('reservaId') reservaId: string, @Param('huespedId') huespedId: string,
    @Body() datos: { rol: string }) {
    return this.service.modificarRol(Number(reservaId), Number(huespedId), datos.rol);
  }

  @Delete('reservas/:reservaId/asignaciones/:huespedId')
  @HttpCode(204)
  eliminar(@Param('reservaId') reservaId: string, @Param('huespedId') huespedId: string) {
    return this.service.eliminarAsignacion(Number(reservaId), Number(huespedId));
  }
}
