import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ANALISTA } from '../../models/analista-asignacion.model.mjs';

export async function crearAnalistaRepository(analista) {
  await MODELO_ANALISTA.build(EntityRepository).put(
    analista,
    { condition: { attr: 'analistaId', exists: false } }
  );
}

export async function listarAnalistasRepository() {
  const { Items = [] } = await MODELO_ANALISTA.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
