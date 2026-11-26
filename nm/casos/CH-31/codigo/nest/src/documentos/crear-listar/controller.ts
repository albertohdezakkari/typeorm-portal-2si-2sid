import { Controller, Post, Get, Body } from '@nestjs/common';
import { CrearListarService } from './service';

@Controller()
export class CrearListarController {
  constructor(private readonly service: CrearListarService) {}

  @Post('documentos')
  async ejecutar(@Body() datos: { nombre: string; paginas: number; archivoId: number }) {
    return this.service.crearDocumentoService(datos.nombre, datos.paginas, datos.archivoId);
  }

  @Get('documentos')
  listar() {
    return this.service.listarDocumentosService();
  }
}
