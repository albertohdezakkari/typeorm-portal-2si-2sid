import { Body, Controller, Get, Post, Delete, HttpCode, Param, Patch, Query } from '@nestjs/common';
import { HabitacionesService } from './habitaciones.service';

@Controller()
export class HabitacionesController {
  constructor(private readonly service: HabitacionesService) {}

  @Post('habitaciones')
  crear(@Body() datos: { nombre: string; camas: number; hospitalId: number }) {
    return this.service.crearHabitacion(datos.nombre, datos.camas, datos.hospitalId);
  }

  @Get('habitaciones')
  listar() {
    return this.service.listarHabitaciones();
  }

  @Delete('habitaciones/:habitacionId')
  @HttpCode(204)
  eliminar(@Param('habitacionId') habitacionId: string) {
    return this.service.eliminarHabitacion(Number(habitacionId));
  }

  @Patch('habitaciones/:habitacionId')
  modificar(@Param('habitacionId') habitacionId: string, @Body() datos: { camas: number }) {
    return this.service.modificarCamas(Number(habitacionId), datos.camas);
  }

  @Patch('habitaciones/:habitacionId/hospital')
  cambiarHospital(@Param('habitacionId') habitacionId: string, @Body() datos: { hospitalId: number }) {
    return this.service.cambiarHospital(Number(habitacionId), datos.hospitalId);
  }

  @Get('hospitales/:hospitalId/habitaciones')
  consultar(@Param('hospitalId') hospitalId: string, @Query('minimo') minimo = '0') {
    return this.service.consultarHospital(Number(hospitalId), Number(minimo));
  }
}
