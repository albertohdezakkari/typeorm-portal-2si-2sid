import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_GUIA } from '../../models/guia-asignacion.model.mjs';

export async function crearGuiaRepository(guia) {
  await MODELO_GUIA.build(EntityRepository).put(
    guia,
    { condition: { attr: 'guiaId', exists: false } }
  );
}

export async function listarGuiasRepository() {
  const { Items = [] } = await MODELO_GUIA.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
