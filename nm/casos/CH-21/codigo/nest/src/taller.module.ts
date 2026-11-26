import { Analista } from './analistas/entities/analista.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { AnalistasRepository } from './analistas/crear-listar/repository';
import { AnalistasService } from './analistas/crear-listar/service';
import { AnalistasController } from './analistas/crear-listar/controller';
import { AsignarAnalistaRepository } from './asignaciones/asignar-analista/repository';
import { AsignarAnalistaService } from './asignaciones/asignar-analista/service';
import { AsignarAnalistaController } from './asignaciones/asignar-analista/controller';
import { ListarPorMuestraRepository } from './asignaciones/listar-por-muestra/repository';
import { ListarPorMuestraService } from './asignaciones/listar-por-muestra/service';
import { ListarPorMuestraController } from './asignaciones/listar-por-muestra/controller';
import { ListarPorAnalistaRepository } from './asignaciones/listar-por-analista/repository';
import { ListarPorAnalistaService } from './asignaciones/listar-por-analista/service';
import { ListarPorAnalistaController } from './asignaciones/listar-por-analista/controller';
import { ModificarRolRepository } from './asignaciones/modificar-rol/repository';
import { ModificarRolService } from './asignaciones/modificar-rol/service';
import { ModificarRolController } from './asignaciones/modificar-rol/controller';
import { EliminarAsignacionRepository } from './asignaciones/eliminar-asignacion/repository';
import { EliminarAsignacionService } from './asignaciones/eliminar-asignacion/service';
import { EliminarAsignacionController } from './asignaciones/eliminar-asignacion/controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Laboratorio } from './laboratorios/entities/laboratorio.entity';
import { Muestra } from './muestras/entities/muestra.entity';
import { CrearListarController } from './muestras/crear-listar/controller';
import { CrearListarService } from './muestras/crear-listar/service';
import { CrearListarRepository } from './muestras/crear-listar/repository';
import { EliminarController } from './muestras/eliminar/controller';
import { EliminarService } from './muestras/eliminar/service';
import { EliminarRepository } from './muestras/eliminar/repository';
import { ModificarCantidadMlController } from './muestras/modificar-cantidad-ml/controller';
import { ModificarCantidadMlService } from './muestras/modificar-cantidad-ml/service';
import { ModificarCantidadMlRepository } from './muestras/modificar-cantidad-ml/repository';
import { TrasladarController } from './muestras/trasladar/controller';
import { TrasladarService } from './muestras/trasladar/service';
import { TrasladarRepository } from './muestras/trasladar/repository';
import { ConsultarLaboratorioController } from './laboratorios/consultar/controller';
import { ConsultarLaboratorioService } from './laboratorios/consultar/service';
import { ConsultarLaboratorioRepository } from './laboratorios/consultar/repository';

@Module({
  imports: [TypeOrmModule.forFeature([Laboratorio, Muestra, Analista, Asignacion])],
  controllers: [AnalistasController, AsignarAnalistaController, ListarPorMuestraController, ListarPorAnalistaController, ModificarRolController, EliminarAsignacionController, CrearListarController, EliminarController, ModificarCantidadMlController, TrasladarController, ConsultarLaboratorioController],
  providers: [AnalistasRepository, AnalistasService, AsignarAnalistaRepository, AsignarAnalistaService, ListarPorMuestraRepository, ListarPorMuestraService, ListarPorAnalistaRepository, ListarPorAnalistaService, ModificarRolRepository, ModificarRolService, EliminarAsignacionRepository, EliminarAsignacionService, CrearListarService, EliminarService, ModificarCantidadMlService, TrasladarService, ConsultarLaboratorioService, CrearListarRepository, EliminarRepository, ModificarCantidadMlRepository, TrasladarRepository, ConsultarLaboratorioRepository]
})
export class TallerModule {}
