import { Body, Controller, Get, Post, Delete, HttpCode, Param, Patch, Query } from '@nestjs/common';
import { AnimalesService } from './animales.service';

@Controller()
export class AnimalesController {
  constructor(private readonly service: AnimalesService) {}

  @Post('animales')
  crear(@Body() datos: { nombre: string; edadMeses: number; refugioId: number }) {
    return this.service.crearAnimal(datos.nombre, datos.edadMeses, datos.refugioId);
  }

  @Get('animales')
  listar() {
    return this.service.listarAnimales();
  }

  @Delete('animales/:animalId')
  @HttpCode(204)
  eliminar(@Param('animalId') animalId: string) {
    return this.service.eliminarAnimal(Number(animalId));
  }

  @Patch('animales/:animalId')
  modificar(@Param('animalId') animalId: string, @Body() datos: { edadMeses: number }) {
    return this.service.modificarEdadMeses(Number(animalId), datos.edadMeses);
  }

  @Patch('animales/:animalId/refugio')
  cambiarRefugio(@Param('animalId') animalId: string, @Body() datos: { refugioId: number }) {
    return this.service.cambiarRefugio(Number(animalId), datos.refugioId);
  }

  @Get('refugios/:refugioId/animales')
  consultar(@Param('refugioId') refugioId: string, @Query('minimo') minimo = '0') {
    return this.service.consultarRefugio(Number(refugioId), Number(minimo));
  }
}
