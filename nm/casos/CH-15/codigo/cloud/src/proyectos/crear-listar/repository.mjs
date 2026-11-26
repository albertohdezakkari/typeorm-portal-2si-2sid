import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PROYECTO, MODELO_EMPRESA } from '../../models/empresa-proyecto.model.mjs';

export async function crearProyectoRepository(proyecto) {
  await MODELO_PROYECTO.build(EntityRepository).put(
    proyecto,
    { condition: { attr: 'proyectoId', exists: false } }
  );
}

export async function listarProyectosRepository() {
  const { Items = [] } = await MODELO_PROYECTO.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
