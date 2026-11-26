import { Jardinero } from './jardineros/entities/jardinero.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { JardinerosRepository } from './jardineros/crear-listar/repository';
import { JardinerosService } from './jardineros/crear-listar/service';
import { JardinerosController } from './jardineros/crear-listar/controller';
import { AsignarJardineroRepository } from './asignaciones/asignar-jardinero/repository';
import { AsignarJardineroService } from './asignaciones/asignar-jardinero/service';
import { AsignarJardineroController } from './asignaciones/asignar-jardinero/controller';
import { ListarPorZonaRepository } from './asignaciones/listar-por-zona/repository';
import { ListarPorZonaService } from './asignaciones/listar-por-zona/service';
import { ListarPorZonaController } from './asignaciones/listar-por-zona/controller';
import { ListarPorJardineroRepository } from './asignaciones/listar-por-jardinero/repository';
import { ListarPorJardineroService } from './asignaciones/listar-por-jardinero/service';
import { ListarPorJardineroController } from './asignaciones/listar-por-jardinero/controller';
import { ModificarRolRepository } from './asignaciones/modificar-rol/repository';
import { ModificarRolService } from './asignaciones/modificar-rol/service';
import { ModificarRolController } from './asignaciones/modificar-rol/controller';
import { EliminarAsignacionRepository } from './asignaciones/eliminar-asignacion/repository';
import { EliminarAsignacionService } from './asignaciones/eliminar-asignacion/service';
import { EliminarAsignacionController } from './asignaciones/eliminar-asignacion/controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parque } from './parques/entities/parque.entity';
import { Zona } from './zonas/entities/zona.entity';
import { CrearListarController } from './zonas/crear-listar/controller';
import { CrearListarService } from './zonas/crear-listar/service';
import { CrearListarRepository } from './zonas/crear-listar/repository';
import { EliminarController } from './zonas/eliminar/controller';
import { EliminarService } from './zonas/eliminar/service';
import { EliminarRepository } from './zonas/eliminar/repository';
import { ModificarCapacidadController } from './zonas/modificar-capacidad/controller';
import { ModificarCapacidadService } from './zonas/modificar-capacidad/service';
import { ModificarCapacidadRepository } from './zonas/modificar-capacidad/repository';
import { TrasladarController } from './zonas/trasladar/controller';
import { TrasladarService } from './zonas/trasladar/service';
import { TrasladarRepository } from './zonas/trasladar/repository';
import { ConsultarParqueController } from './parques/consultar/controller';
import { ConsultarParqueService } from './parques/consultar/service';
import { ConsultarParqueRepository } from './parques/consultar/repository';

@Module({
  imports: [TypeOrmModule.forFeature([Parque, Zona, Jardinero, Asignacion])],
  controllers: [JardinerosController, AsignarJardineroController, ListarPorZonaController, ListarPorJardineroController, ModificarRolController, EliminarAsignacionController, CrearListarController, EliminarController, ModificarCapacidadController, TrasladarController, ConsultarParqueController],
  providers: [JardinerosRepository, JardinerosService, AsignarJardineroRepository, AsignarJardineroService, ListarPorZonaRepository, ListarPorZonaService, ListarPorJardineroRepository, ListarPorJardineroService, ModificarRolRepository, ModificarRolService, EliminarAsignacionRepository, EliminarAsignacionService, CrearListarService, EliminarService, ModificarCapacidadService, TrasladarService, ConsultarParqueService, CrearListarRepository, EliminarRepository, ModificarCapacidadRepository, TrasladarRepository, ConsultarParqueRepository]
})
export class TallerModule {}
