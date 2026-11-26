import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_TECNICO } from '../../models/tecnico-asignacion.model.mjs';

export async function crearTecnicoRepository(tecnico) {
  await MODELO_TECNICO.build(EntityRepository).put(
    tecnico,
    { condition: { attr: 'tecnicoId', exists: false } }
  );
}

export async function listarTecnicosRepository() {
  const { Items = [] } = await MODELO_TECNICO.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
