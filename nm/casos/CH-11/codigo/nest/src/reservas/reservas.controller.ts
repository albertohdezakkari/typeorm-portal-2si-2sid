import { Body, Controller, Get, Post, Delete, HttpCode, Param, Patch, Query } from '@nestjs/common';
import { ReservasService } from './reservas.service';

@Controller()
export class ReservasController {
  constructor(private readonly service: ReservasService) {}

  @Post('reservas')
  crear(@Body() datos: { nombre: string; noches: number; hotelId: number }) {
    return this.service.crearReserva(datos.nombre, datos.noches, datos.hotelId);
  }

  @Get('reservas')
  listar() {
    return this.service.listarReservas();
  }

  @Delete('reservas/:reservaId')
  @HttpCode(204)
  eliminar(@Param('reservaId') reservaId: string) {
    return this.service.eliminarReserva(Number(reservaId));
  }

  @Patch('reservas/:reservaId')
  modificar(@Param('reservaId') reservaId: string, @Body() datos: { noches: number }) {
    return this.service.modificarNoches(Number(reservaId), datos.noches);
  }

  @Patch('reservas/:reservaId/hotel')
  cambiarHotel(@Param('reservaId') reservaId: string, @Body() datos: { hotelId: number }) {
    return this.service.cambiarHotel(Number(reservaId), datos.hotelId);
  }

  @Get('hoteles/:hotelId/reservas')
  consultar(@Param('hotelId') hotelId: string, @Query('minimo') minimo = '0') {
    return this.service.consultarHotel(Number(hotelId), Number(minimo));
  }
}
