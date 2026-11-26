import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PARCELA } from '../../models/huerto-parcela.model.mjs';
import { MODELO_CULTIVADOR, MODELO_ASIGNACION } from '../../models/cultivador-asignacion.model.mjs';

export async function buscarParcelaRepository(parcelaId) {
  const { Item } = await MODELO_PARCELA.build(EntityRepository).get(
    { parcelaId },
    { consistent: true }
  );
  return Item;
}

export async function buscarCultivadorRepository(cultivadorId) {
  const { Item } = await MODELO_CULTIVADOR.build(EntityRepository).get(
    { cultivadorId },
    { consistent: true }
  );
  return Item;
}

export async function asignarCultivadorRepository(parcelaId, cultivadorId, rol) {
  const asignacion = { parcelaId, cultivadorId, rol };
  await MODELO_ASIGNACION.build(EntityRepository).put(
    asignacion,
    { condition: { attr: 'parcelaId', exists: false } }
  );
  return asignacion;
}
