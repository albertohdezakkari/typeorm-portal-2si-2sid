import { Guia } from './guias/entities/guia.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { GuiasRepository } from './guias/crear-listar/repository';
import { GuiasService } from './guias/crear-listar/service';
import { GuiasController } from './guias/crear-listar/controller';
import { AsignarGuiaRepository } from './asignaciones/asignar-guia/repository';
import { AsignarGuiaService } from './asignaciones/asignar-guia/service';
import { AsignarGuiaController } from './asignaciones/asignar-guia/controller';
import { ListarPorExcursionRepository } from './asignaciones/listar-por-excursion/repository';
import { ListarPorExcursionService } from './asignaciones/listar-por-excursion/service';
import { ListarPorExcursionController } from './asignaciones/listar-por-excursion/controller';
import { ListarPorGuiaRepository } from './asignaciones/listar-por-guia/repository';
import { ListarPorGuiaService } from './asignaciones/listar-por-guia/service';
import { ListarPorGuiaController } from './asignaciones/listar-por-guia/controller';
import { ModificarRolRepository } from './asignaciones/modificar-rol/repository';
import { ModificarRolService } from './asignaciones/modificar-rol/service';
import { ModificarRolController } from './asignaciones/modificar-rol/controller';
import { EliminarAsignacionRepository } from './asignaciones/eliminar-asignacion/repository';
import { EliminarAsignacionService } from './asignaciones/eliminar-asignacion/service';
import { EliminarAsignacionController } from './asignaciones/eliminar-asignacion/controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agencia } from './agencias/entities/agencia.entity';
import { Excursion } from './excursiones/entities/excursion.entity';
import { CrearListarController } from './excursiones/crear-listar/controller';
import { CrearListarService } from './excursiones/crear-listar/service';
import { CrearListarRepository } from './excursiones/crear-listar/repository';
import { EliminarController } from './excursiones/eliminar/controller';
import { EliminarService } from './excursiones/eliminar/service';
import { EliminarRepository } from './excursiones/eliminar/repository';
import { ModificarDuracionHorasController } from './excursiones/modificar-duracion-horas/controller';
import { ModificarDuracionHorasService } from './excursiones/modificar-duracion-horas/service';
import { ModificarDuracionHorasRepository } from './excursiones/modificar-duracion-horas/repository';
import { TrasladarController } from './excursiones/trasladar/controller';
import { TrasladarService } from './excursiones/trasladar/service';
import { TrasladarRepository } from './excursiones/trasladar/repository';
import { ConsultarAgenciaController } from './agencias/consultar/controller';
import { ConsultarAgenciaService } from './agencias/consultar/service';
import { ConsultarAgenciaRepository } from './agencias/consultar/repository';

@Module({
  imports: [TypeOrmModule.forFeature([Agencia, Excursion, Guia, Asignacion])],
  controllers: [GuiasController, AsignarGuiaController, ListarPorExcursionController, ListarPorGuiaController, ModificarRolController, EliminarAsignacionController, CrearListarController, EliminarController, ModificarDuracionHorasController, TrasladarController, ConsultarAgenciaController],
  providers: [GuiasRepository, GuiasService, AsignarGuiaRepository, AsignarGuiaService, ListarPorExcursionRepository, ListarPorExcursionService, ListarPorGuiaRepository, ListarPorGuiaService, ModificarRolRepository, ModificarRolService, EliminarAsignacionRepository, EliminarAsignacionService, CrearListarService, EliminarService, ModificarDuracionHorasService, TrasladarService, ConsultarAgenciaService, CrearListarRepository, EliminarRepository, ModificarDuracionHorasRepository, TrasladarRepository, ConsultarAgenciaRepository]
})
export class TallerModule {}
