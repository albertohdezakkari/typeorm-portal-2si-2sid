import { Body, Controller, Get, Post } from '@nestjs/common';
import { ArtistasService } from './service';

@Controller('artistas')
export class ArtistasController {
  constructor(private readonly service: ArtistasService) {}

  @Post()
  crear(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearArtistaService(datos.nombre, datos.apellidos, datos.email);
  }

  @Get()
  listar() {
    return this.service.listarArtistasService();
  }
}
