import { Body, Controller, Param, Post } from '@nestjs/common';
import { AsignarArtistaService } from './service';

@Controller('actuaciones/:actuacionId/asignaciones')
export class AsignarArtistaController {
  constructor(private readonly service: AsignarArtistaService) {}

  @Post()
  asignar(@Param('actuacionId') actuacionId: string, @Body() datos: { artistaId: number; rol: string }) {
    return this.service.asignarArtistaService(Number(actuacionId), datos.artistaId, datos.rol);
  }
}
