import { Body, Controller, Param, Post, Get, Patch, Delete, HttpCode } from '@nestjs/common';
import { AsignacionesService } from './asignaciones.service';

@Controller()
export class AsignacionesController {
  constructor(private readonly service: AsignacionesService) {}

  @Post('productos/:productoId/asignaciones')
  asignar(@Param('productoId') productoId: string, @Body() datos: { panaderoId: number; rol: string }) {
    return this.service.asignarPanadero(Number(productoId), datos.panaderoId, datos.rol);
  }

  @Get('productos/:productoId/asignaciones')
  listarPorProducto(@Param('productoId') productoId: string) {
    return this.service.listarPorProducto(Number(productoId));
  }

  @Get('panaderos/:panaderoId/asignaciones')
  listarPorPanadero(@Param('panaderoId') panaderoId: string) {
    return this.service.listarPorPanadero(Number(panaderoId));
  }

  @Patch('productos/:productoId/asignaciones/:panaderoId')
  modificarRol(@Param('productoId') productoId: string, @Param('panaderoId') panaderoId: string,
    @Body() datos: { rol: string }) {
    return this.service.modificarRol(Number(productoId), Number(panaderoId), datos.rol);
  }

  @Delete('productos/:productoId/asignaciones/:panaderoId')
  @HttpCode(204)
  eliminar(@Param('productoId') productoId: string, @Param('panaderoId') panaderoId: string) {
    return this.service.eliminarAsignacion(Number(productoId), Number(panaderoId));
  }
}
