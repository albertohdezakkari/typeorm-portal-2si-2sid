import { Restaurador } from './restauradores/entities/restaurador.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { RestauradoresRepository } from './restauradores/crear-listar/repository';
import { RestauradoresService } from './restauradores/crear-listar/service';
import { RestauradoresController } from './restauradores/crear-listar/controller';
import { AsignarRestauradorRepository } from './asignaciones/asignar-restaurador/repository';
import { AsignarRestauradorService } from './asignaciones/asignar-restaurador/service';
import { AsignarRestauradorController } from './asignaciones/asignar-restaurador/controller';
import { ListarPorPiezaRepository } from './asignaciones/listar-por-pieza/repository';
import { ListarPorPiezaService } from './asignaciones/listar-por-pieza/service';
import { ListarPorPiezaController } from './asignaciones/listar-por-pieza/controller';
import { ListarPorRestauradorRepository } from './asignaciones/listar-por-restaurador/repository';
import { ListarPorRestauradorService } from './asignaciones/listar-por-restaurador/service';
import { ListarPorRestauradorController } from './asignaciones/listar-por-restaurador/controller';
import { ModificarRolRepository } from './asignaciones/modificar-rol/repository';
import { ModificarRolService } from './asignaciones/modificar-rol/service';
import { ModificarRolController } from './asignaciones/modificar-rol/controller';
import { EliminarAsignacionRepository } from './asignaciones/eliminar-asignacion/repository';
import { EliminarAsignacionService } from './asignaciones/eliminar-asignacion/service';
import { EliminarAsignacionController } from './asignaciones/eliminar-asignacion/controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Museo } from './museos/entities/museo.entity';
import { Pieza } from './piezas/entities/pieza.entity';
import { CrearListarController } from './piezas/crear-listar/controller';
import { CrearListarService } from './piezas/crear-listar/service';
import { CrearListarRepository } from './piezas/crear-listar/repository';
import { EliminarController } from './piezas/eliminar/controller';
import { EliminarService } from './piezas/eliminar/service';
import { EliminarRepository } from './piezas/eliminar/repository';
import { ModificarAntiguedadAniosController } from './piezas/modificar-antiguedad-anios/controller';
import { ModificarAntiguedadAniosService } from './piezas/modificar-antiguedad-anios/service';
import { ModificarAntiguedadAniosRepository } from './piezas/modificar-antiguedad-anios/repository';
import { TrasladarController } from './piezas/trasladar/controller';
import { TrasladarService } from './piezas/trasladar/service';
import { TrasladarRepository } from './piezas/trasladar/repository';
import { ConsultarMuseoController } from './museos/consultar/controller';
import { ConsultarMuseoService } from './museos/consultar/service';
import { ConsultarMuseoRepository } from './museos/consultar/repository';

@Module({
  imports: [TypeOrmModule.forFeature([Museo, Pieza, Restaurador, Asignacion])],
  controllers: [RestauradoresController, AsignarRestauradorController, ListarPorPiezaController, ListarPorRestauradorController, ModificarRolController, EliminarAsignacionController, CrearListarController, EliminarController, ModificarAntiguedadAniosController, TrasladarController, ConsultarMuseoController],
  providers: [RestauradoresRepository, RestauradoresService, AsignarRestauradorRepository, AsignarRestauradorService, ListarPorPiezaRepository, ListarPorPiezaService, ListarPorRestauradorRepository, ListarPorRestauradorService, ModificarRolRepository, ModificarRolService, EliminarAsignacionRepository, EliminarAsignacionService, CrearListarService, EliminarService, ModificarAntiguedadAniosService, TrasladarService, ConsultarMuseoService, CrearListarRepository, EliminarRepository, ModificarAntiguedadAniosRepository, TrasladarRepository, ConsultarMuseoRepository]
})
export class TallerModule {}
