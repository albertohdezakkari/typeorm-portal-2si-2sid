import { Body, Controller, Get, Post, Delete, HttpCode, Param, Patch, Query } from '@nestjs/common';
import { ActuacionesService } from './actuaciones.service';

@Controller()
export class ActuacionesController {
  constructor(private readonly service: ActuacionesService) {}

  @Post('actuaciones')
  crear(@Body() datos: { nombre: string; duracionMinutos: number; festivalId: number }) {
    return this.service.crearActuacion(datos.nombre, datos.duracionMinutos, datos.festivalId);
  }

  @Get('actuaciones')
  listar() {
    return this.service.listarActuaciones();
  }

  @Delete('actuaciones/:actuacionId')
  @HttpCode(204)
  eliminar(@Param('actuacionId') actuacionId: string) {
    return this.service.eliminarActuacion(Number(actuacionId));
  }

  @Patch('actuaciones/:actuacionId')
  modificar(@Param('actuacionId') actuacionId: string, @Body() datos: { duracionMinutos: number }) {
    return this.service.modificarDuracionMinutos(Number(actuacionId), datos.duracionMinutos);
  }

  @Patch('actuaciones/:actuacionId/festival')
  cambiarFestival(@Param('actuacionId') actuacionId: string, @Body() datos: { festivalId: number }) {
    return this.service.cambiarFestival(Number(actuacionId), datos.festivalId);
  }

  @Get('festivales/:festivalId/actuaciones')
  consultar(@Param('festivalId') festivalId: string, @Query('minimo') minimo = '0') {
    return this.service.consultarFestival(Number(festivalId), Number(minimo));
  }
}
