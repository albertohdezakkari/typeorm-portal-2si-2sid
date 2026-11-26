import { Tecnico } from './tecnicos/entities/tecnico.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { TecnicosRepository } from './tecnicos/crear-listar/repository';
import { TecnicosService } from './tecnicos/crear-listar/service';
import { TecnicosController } from './tecnicos/crear-listar/controller';
import { AsignarTecnicoRepository } from './asignaciones/asignar-tecnico/repository';
import { AsignarTecnicoService } from './asignaciones/asignar-tecnico/service';
import { AsignarTecnicoController } from './asignaciones/asignar-tecnico/controller';
import { ListarPorPlazaRepository } from './asignaciones/listar-por-plaza/repository';
import { ListarPorPlazaService } from './asignaciones/listar-por-plaza/service';
import { ListarPorPlazaController } from './asignaciones/listar-por-plaza/controller';
import { ListarPorTecnicoRepository } from './asignaciones/listar-por-tecnico/repository';
import { ListarPorTecnicoService } from './asignaciones/listar-por-tecnico/service';
import { ListarPorTecnicoController } from './asignaciones/listar-por-tecnico/controller';
import { ModificarRolRepository } from './asignaciones/modificar-rol/repository';
import { ModificarRolService } from './asignaciones/modificar-rol/service';
import { ModificarRolController } from './asignaciones/modificar-rol/controller';
import { EliminarAsignacionRepository } from './asignaciones/eliminar-asignacion/repository';
import { EliminarAsignacionService } from './asignaciones/eliminar-asignacion/service';
import { EliminarAsignacionController } from './asignaciones/eliminar-asignacion/controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Urbanizacion } from './urbanizaciones/entities/urbanizacion.entity';
import { Plaza } from './plazas/entities/plaza.entity';
import { CrearListarController } from './plazas/crear-listar/controller';
import { CrearListarService } from './plazas/crear-listar/service';
import { CrearListarRepository } from './plazas/crear-listar/repository';
import { EliminarController } from './plazas/eliminar/controller';
import { EliminarService } from './plazas/eliminar/service';
import { EliminarRepository } from './plazas/eliminar/repository';
import { ModificarSuperficieM2Controller } from './plazas/modificar-superficie-m2/controller';
import { ModificarSuperficieM2Service } from './plazas/modificar-superficie-m2/service';
import { ModificarSuperficieM2Repository } from './plazas/modificar-superficie-m2/repository';
import { TrasladarController } from './plazas/trasladar/controller';
import { TrasladarService } from './plazas/trasladar/service';
import { TrasladarRepository } from './plazas/trasladar/repository';
import { ConsultarUrbanizacionController } from './urbanizaciones/consultar/controller';
import { ConsultarUrbanizacionService } from './urbanizaciones/consultar/service';
import { ConsultarUrbanizacionRepository } from './urbanizaciones/consultar/repository';

@Module({
  imports: [TypeOrmModule.forFeature([Urbanizacion, Plaza, Tecnico, Asignacion])],
  controllers: [TecnicosController, AsignarTecnicoController, ListarPorPlazaController, ListarPorTecnicoController, ModificarRolController, EliminarAsignacionController, CrearListarController, EliminarController, ModificarSuperficieM2Controller, TrasladarController, ConsultarUrbanizacionController],
  providers: [TecnicosRepository, TecnicosService, AsignarTecnicoRepository, AsignarTecnicoService, ListarPorPlazaRepository, ListarPorPlazaService, ListarPorTecnicoRepository, ListarPorTecnicoService, ModificarRolRepository, ModificarRolService, EliminarAsignacionRepository, EliminarAsignacionService, CrearListarService, EliminarService, ModificarSuperficieM2Service, TrasladarService, ConsultarUrbanizacionService, CrearListarRepository, EliminarRepository, ModificarSuperficieM2Repository, TrasladarRepository, ConsultarUrbanizacionRepository]
})
export class TallerModule {}
