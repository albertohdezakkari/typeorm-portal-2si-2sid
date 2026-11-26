import { Cocinero } from './cocineros/entities/cocinero.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { CocinerosRepository } from './cocineros/crear-listar/repository';
import { CocinerosService } from './cocineros/crear-listar/service';
import { CocinerosController } from './cocineros/crear-listar/controller';
import { AsignarCocineroRepository } from './asignaciones/asignar-cocinero/repository';
import { AsignarCocineroService } from './asignaciones/asignar-cocinero/service';
import { AsignarCocineroController } from './asignaciones/asignar-cocinero/controller';
import { ListarPorComandaRepository } from './asignaciones/listar-por-comanda/repository';
import { ListarPorComandaService } from './asignaciones/listar-por-comanda/service';
import { ListarPorComandaController } from './asignaciones/listar-por-comanda/controller';
import { ListarPorCocineroRepository } from './asignaciones/listar-por-cocinero/repository';
import { ListarPorCocineroService } from './asignaciones/listar-por-cocinero/service';
import { ListarPorCocineroController } from './asignaciones/listar-por-cocinero/controller';
import { ModificarRolRepository } from './asignaciones/modificar-rol/repository';
import { ModificarRolService } from './asignaciones/modificar-rol/service';
import { ModificarRolController } from './asignaciones/modificar-rol/controller';
import { EliminarAsignacionRepository } from './asignaciones/eliminar-asignacion/repository';
import { EliminarAsignacionService } from './asignaciones/eliminar-asignacion/service';
import { EliminarAsignacionController } from './asignaciones/eliminar-asignacion/controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cafeteria } from './cafeterias/entities/cafeteria.entity';
import { Comanda } from './comandas/entities/comanda.entity';
import { CrearListarController } from './comandas/crear-listar/controller';
import { CrearListarService } from './comandas/crear-listar/service';
import { CrearListarRepository } from './comandas/crear-listar/repository';
import { EliminarController } from './comandas/eliminar/controller';
import { EliminarService } from './comandas/eliminar/service';
import { EliminarRepository } from './comandas/eliminar/repository';
import { ModificarImporteCentimosController } from './comandas/modificar-importe-centimos/controller';
import { ModificarImporteCentimosService } from './comandas/modificar-importe-centimos/service';
import { ModificarImporteCentimosRepository } from './comandas/modificar-importe-centimos/repository';
import { TrasladarController } from './comandas/trasladar/controller';
import { TrasladarService } from './comandas/trasladar/service';
import { TrasladarRepository } from './comandas/trasladar/repository';
import { ConsultarCafeteriaController } from './cafeterias/consultar/controller';
import { ConsultarCafeteriaService } from './cafeterias/consultar/service';
import { ConsultarCafeteriaRepository } from './cafeterias/consultar/repository';

@Module({
  imports: [TypeOrmModule.forFeature([Cafeteria, Comanda, Cocinero, Asignacion])],
  controllers: [CocinerosController, AsignarCocineroController, ListarPorComandaController, ListarPorCocineroController, ModificarRolController, EliminarAsignacionController, CrearListarController, EliminarController, ModificarImporteCentimosController, TrasladarController, ConsultarCafeteriaController],
  providers: [CocinerosRepository, CocinerosService, AsignarCocineroRepository, AsignarCocineroService, ListarPorComandaRepository, ListarPorComandaService, ListarPorCocineroRepository, ListarPorCocineroService, ModificarRolRepository, ModificarRolService, EliminarAsignacionRepository, EliminarAsignacionService, CrearListarService, EliminarService, ModificarImporteCentimosService, TrasladarService, ConsultarCafeteriaService, CrearListarRepository, EliminarRepository, ModificarImporteCentimosRepository, TrasladarRepository, ConsultarCafeteriaRepository]
})
export class TallerModule {}
