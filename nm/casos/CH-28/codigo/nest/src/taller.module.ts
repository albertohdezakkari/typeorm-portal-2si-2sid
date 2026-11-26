import { Jardinero } from './jardineros/entities/jardinero.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { JardinerosRepository } from './jardineros/crear-listar/repository';
import { JardinerosService } from './jardineros/crear-listar/service';
import { JardinerosController } from './jardineros/crear-listar/controller';
import { AsignarJardineroRepository } from './asignaciones/asignar-jardinero/repository';
import { AsignarJardineroService } from './asignaciones/asignar-jardinero/service';
import { AsignarJardineroController } from './asignaciones/asignar-jardinero/controller';
import { ListarPorPlantaRepository } from './asignaciones/listar-por-planta/repository';
import { ListarPorPlantaService } from './asignaciones/listar-por-planta/service';
import { ListarPorPlantaController } from './asignaciones/listar-por-planta/controller';
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
import { Vivero } from './viveros/entities/vivero.entity';
import { Planta } from './plantas/entities/planta.entity';
import { CrearListarController } from './plantas/crear-listar/controller';
import { CrearListarService } from './plantas/crear-listar/service';
import { CrearListarRepository } from './plantas/crear-listar/repository';
import { EliminarController } from './plantas/eliminar/controller';
import { EliminarService } from './plantas/eliminar/service';
import { EliminarRepository } from './plantas/eliminar/repository';
import { ModificarAlturaCmController } from './plantas/modificar-altura-cm/controller';
import { ModificarAlturaCmService } from './plantas/modificar-altura-cm/service';
import { ModificarAlturaCmRepository } from './plantas/modificar-altura-cm/repository';
import { TrasladarController } from './plantas/trasladar/controller';
import { TrasladarService } from './plantas/trasladar/service';
import { TrasladarRepository } from './plantas/trasladar/repository';
import { ConsultarViveroController } from './viveros/consultar/controller';
import { ConsultarViveroService } from './viveros/consultar/service';
import { ConsultarViveroRepository } from './viveros/consultar/repository';

@Module({
  imports: [TypeOrmModule.forFeature([Vivero, Planta, Jardinero, Asignacion])],
  controllers: [JardinerosController, AsignarJardineroController, ListarPorPlantaController, ListarPorJardineroController, ModificarRolController, EliminarAsignacionController, CrearListarController, EliminarController, ModificarAlturaCmController, TrasladarController, ConsultarViveroController],
  providers: [JardinerosRepository, JardinerosService, AsignarJardineroRepository, AsignarJardineroService, ListarPorPlantaRepository, ListarPorPlantaService, ListarPorJardineroRepository, ListarPorJardineroService, ModificarRolRepository, ModificarRolService, EliminarAsignacionRepository, EliminarAsignacionService, CrearListarService, EliminarService, ModificarAlturaCmService, TrasladarService, ConsultarViveroService, CrearListarRepository, EliminarRepository, ModificarAlturaCmRepository, TrasladarRepository, ConsultarViveroRepository]
})
export class TallerModule {}
