import { Body, Controller, Param, Post } from '@nestjs/common';
import { AsignarAutorService } from './service';

@Controller('publicaciones/:publicacionId/asignaciones')
export class AsignarAutorController {
  constructor(private readonly service: AsignarAutorService) {}

  @Post()
  asignar(@Param('publicacionId') publicacionId: string, @Body() datos: { autorId: number; rol: string }) {
    return this.service.asignarAutorService(Number(publicacionId), datos.autorId, datos.rol);
  }
}
