import { Entrenador } from './entrenadores/entities/entrenador.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { EntrenadoresRepository } from './entrenadores/crear-listar/repository';
import { EntrenadoresService } from './entrenadores/crear-listar/service';
import { EntrenadoresController } from './entrenadores/crear-listar/controller';
import { AsignarEntrenadorRepository } from './asignaciones/asignar-entrenador/repository';
import { AsignarEntrenadorService } from './asignaciones/asignar-entrenador/service';
import { AsignarEntrenadorController } from './asignaciones/asignar-entrenador/controller';
import { ListarPorPistaRepository } from './asignaciones/listar-por-pista/repository';
import { ListarPorPistaService } from './asignaciones/listar-por-pista/service';
import { ListarPorPistaController } from './asignaciones/listar-por-pista/controller';
import { ListarPorEntrenadorRepository } from './asignaciones/listar-por-entrenador/repository';
import { ListarPorEntrenadorService } from './asignaciones/listar-por-entrenador/service';
import { ListarPorEntrenadorController } from './asignaciones/listar-por-entrenador/controller';
import { ModificarRolRepository } from './asignaciones/modificar-rol/repository';
import { ModificarRolService } from './asignaciones/modificar-rol/service';
import { ModificarRolController } from './asignaciones/modificar-rol/controller';
import { EliminarAsignacionRepository } from './asignaciones/eliminar-asignacion/repository';
import { EliminarAsignacionService } from './asignaciones/eliminar-asignacion/service';
import { EliminarAsignacionController } from './asignaciones/eliminar-asignacion/controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Complejo } from './complejos/entities/complejo.entity';
import { Pista } from './pistas/entities/pista.entity';
import { CrearListarController } from './pistas/crear-listar/controller';
import { CrearListarService } from './pistas/crear-listar/service';
import { CrearListarRepository } from './pistas/crear-listar/repository';
import { EliminarController } from './pistas/eliminar/controller';
import { EliminarService } from './pistas/eliminar/service';
import { EliminarRepository } from './pistas/eliminar/repository';
import { ModificarSuperficieM2Controller } from './pistas/modificar-superficie-m2/controller';
import { ModificarSuperficieM2Service } from './pistas/modificar-superficie-m2/service';
import { ModificarSuperficieM2Repository } from './pistas/modificar-superficie-m2/repository';
import { TrasladarController } from './pistas/trasladar/controller';
import { TrasladarService } from './pistas/trasladar/service';
import { TrasladarRepository } from './pistas/trasladar/repository';
import { ConsultarComplejoController } from './complejos/consultar/controller';
import { ConsultarComplejoService } from './complejos/consultar/service';
import { ConsultarComplejoRepository } from './complejos/consultar/repository';

@Module({
  imports: [TypeOrmModule.forFeature([Complejo, Pista, Entrenador, Asignacion])],
  controllers: [EntrenadoresController, AsignarEntrenadorController, ListarPorPistaController, ListarPorEntrenadorController, ModificarRolController, EliminarAsignacionController, CrearListarController, EliminarController, ModificarSuperficieM2Controller, TrasladarController, ConsultarComplejoController],
  providers: [EntrenadoresRepository, EntrenadoresService, AsignarEntrenadorRepository, AsignarEntrenadorService, ListarPorPistaRepository, ListarPorPistaService, ListarPorEntrenadorRepository, ListarPorEntrenadorService, ModificarRolRepository, ModificarRolService, EliminarAsignacionRepository, EliminarAsignacionService, CrearListarService, EliminarService, ModificarSuperficieM2Service, TrasladarService, ConsultarComplejoService, CrearListarRepository, EliminarRepository, ModificarSuperficieM2Repository, TrasladarRepository, ConsultarComplejoRepository]
})
export class TallerModule {}
