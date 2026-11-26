import { Agricultor } from './agricultores/entities/agricultor.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { AgricultoresRepository } from './agricultores/crear-listar/repository';
import { AgricultoresService } from './agricultores/crear-listar/service';
import { AgricultoresController } from './agricultores/crear-listar/controller';
import { AsignarAgricultorRepository } from './asignaciones/asignar-agricultor/repository';
import { AsignarAgricultorService } from './asignaciones/asignar-agricultor/service';
import { AsignarAgricultorController } from './asignaciones/asignar-agricultor/controller';
import { ListarPorCosechaRepository } from './asignaciones/listar-por-cosecha/repository';
import { ListarPorCosechaService } from './asignaciones/listar-por-cosecha/service';
import { ListarPorCosechaController } from './asignaciones/listar-por-cosecha/controller';
import { ListarPorAgricultorRepository } from './asignaciones/listar-por-agricultor/repository';
import { ListarPorAgricultorService } from './asignaciones/listar-por-agricultor/service';
import { ListarPorAgricultorController } from './asignaciones/listar-por-agricultor/controller';
import { ModificarRolRepository } from './asignaciones/modificar-rol/repository';
import { ModificarRolService } from './asignaciones/modificar-rol/service';
import { ModificarRolController } from './asignaciones/modificar-rol/controller';
import { EliminarAsignacionRepository } from './asignaciones/eliminar-asignacion/repository';
import { EliminarAsignacionService } from './asignaciones/eliminar-asignacion/service';
import { EliminarAsignacionController } from './asignaciones/eliminar-asignacion/controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Granja } from './granjas/entities/granja.entity';
import { Cosecha } from './cosechas/entities/cosecha.entity';
import { CrearListarController } from './cosechas/crear-listar/controller';
import { CrearListarService } from './cosechas/crear-listar/service';
import { CrearListarRepository } from './cosechas/crear-listar/repository';
import { EliminarController } from './cosechas/eliminar/controller';
import { EliminarService } from './cosechas/eliminar/service';
import { EliminarRepository } from './cosechas/eliminar/repository';
import { ModificarKilosController } from './cosechas/modificar-kilos/controller';
import { ModificarKilosService } from './cosechas/modificar-kilos/service';
import { ModificarKilosRepository } from './cosechas/modificar-kilos/repository';
import { TrasladarController } from './cosechas/trasladar/controller';
import { TrasladarService } from './cosechas/trasladar/service';
import { TrasladarRepository } from './cosechas/trasladar/repository';
import { ConsultarGranjaController } from './granjas/consultar/controller';
import { ConsultarGranjaService } from './granjas/consultar/service';
import { ConsultarGranjaRepository } from './granjas/consultar/repository';

@Module({
  imports: [TypeOrmModule.forFeature([Granja, Cosecha, Agricultor, Asignacion])],
  controllers: [AgricultoresController, AsignarAgricultorController, ListarPorCosechaController, ListarPorAgricultorController, ModificarRolController, EliminarAsignacionController, CrearListarController, EliminarController, ModificarKilosController, TrasladarController, ConsultarGranjaController],
  providers: [AgricultoresRepository, AgricultoresService, AsignarAgricultorRepository, AsignarAgricultorService, ListarPorCosechaRepository, ListarPorCosechaService, ListarPorAgricultorRepository, ListarPorAgricultorService, ModificarRolRepository, ModificarRolService, EliminarAsignacionRepository, EliminarAsignacionService, CrearListarService, EliminarService, ModificarKilosService, TrasladarService, ConsultarGranjaService, CrearListarRepository, EliminarRepository, ModificarKilosRepository, TrasladarRepository, ConsultarGranjaRepository]
})
export class TallerModule {}
