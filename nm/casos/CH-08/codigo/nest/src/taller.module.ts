import { Panadero } from './panaderos/entities/panadero.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { PanaderosRepository } from './panaderos/crear-listar/repository';
import { PanaderosService } from './panaderos/crear-listar/service';
import { PanaderosController } from './panaderos/crear-listar/controller';
import { AsignarPanaderoRepository } from './asignaciones/asignar-panadero/repository';
import { AsignarPanaderoService } from './asignaciones/asignar-panadero/service';
import { AsignarPanaderoController } from './asignaciones/asignar-panadero/controller';
import { ListarPorProductoRepository } from './asignaciones/listar-por-producto/repository';
import { ListarPorProductoService } from './asignaciones/listar-por-producto/service';
import { ListarPorProductoController } from './asignaciones/listar-por-producto/controller';
import { ListarPorPanaderoRepository } from './asignaciones/listar-por-panadero/repository';
import { ListarPorPanaderoService } from './asignaciones/listar-por-panadero/service';
import { ListarPorPanaderoController } from './asignaciones/listar-por-panadero/controller';
import { ModificarRolRepository } from './asignaciones/modificar-rol/repository';
import { ModificarRolService } from './asignaciones/modificar-rol/service';
import { ModificarRolController } from './asignaciones/modificar-rol/controller';
import { EliminarAsignacionRepository } from './asignaciones/eliminar-asignacion/repository';
import { EliminarAsignacionService } from './asignaciones/eliminar-asignacion/service';
import { EliminarAsignacionController } from './asignaciones/eliminar-asignacion/controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Panaderia } from './panaderias/entities/panaderia.entity';
import { Producto } from './productos/entities/producto.entity';
import { CrearListarController } from './productos/crear-listar/controller';
import { CrearListarService } from './productos/crear-listar/service';
import { CrearListarRepository } from './productos/crear-listar/repository';
import { EliminarController } from './productos/eliminar/controller';
import { EliminarService } from './productos/eliminar/service';
import { EliminarRepository } from './productos/eliminar/repository';
import { ModificarPrecioCentimosController } from './productos/modificar-precio-centimos/controller';
import { ModificarPrecioCentimosService } from './productos/modificar-precio-centimos/service';
import { ModificarPrecioCentimosRepository } from './productos/modificar-precio-centimos/repository';
import { TrasladarController } from './productos/trasladar/controller';
import { TrasladarService } from './productos/trasladar/service';
import { TrasladarRepository } from './productos/trasladar/repository';
import { ConsultarPanaderiaController } from './panaderias/consultar/controller';
import { ConsultarPanaderiaService } from './panaderias/consultar/service';
import { ConsultarPanaderiaRepository } from './panaderias/consultar/repository';

@Module({
  imports: [TypeOrmModule.forFeature([Panaderia, Producto, Panadero, Asignacion])],
  controllers: [PanaderosController, AsignarPanaderoController, ListarPorProductoController, ListarPorPanaderoController, ModificarRolController, EliminarAsignacionController, CrearListarController, EliminarController, ModificarPrecioCentimosController, TrasladarController, ConsultarPanaderiaController],
  providers: [PanaderosRepository, PanaderosService, AsignarPanaderoRepository, AsignarPanaderoService, ListarPorProductoRepository, ListarPorProductoService, ListarPorPanaderoRepository, ListarPorPanaderoService, ModificarRolRepository, ModificarRolService, EliminarAsignacionRepository, EliminarAsignacionService, CrearListarService, EliminarService, ModificarPrecioCentimosService, TrasladarService, ConsultarPanaderiaService, CrearListarRepository, EliminarRepository, ModificarPrecioCentimosRepository, TrasladarRepository, ConsultarPanaderiaRepository]
})
export class TallerModule {}
