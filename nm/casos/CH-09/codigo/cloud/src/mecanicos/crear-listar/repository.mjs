import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_MECANICO } from '../../models/mecanico-asignacion.model.mjs';

export async function crearMecanicoRepository(mecanico) {
  await MODELO_MECANICO.build(EntityRepository).put(
    mecanico,
    { condition: { attr: 'mecanicoId', exists: false } }
  );
}

export async function listarMecanicosRepository() {
  const { Items = [] } = await MODELO_MECANICO.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
