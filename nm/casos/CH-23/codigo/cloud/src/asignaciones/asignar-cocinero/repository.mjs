import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_COMANDA } from '../../models/cafeteria-comanda.model.mjs';
import { MODELO_COCINERO, MODELO_ASIGNACION } from '../../models/cocinero-asignacion.model.mjs';

export async function buscarComandaRepository(comandaId) {
  const { Item } = await MODELO_COMANDA.build(EntityRepository).get(
    { comandaId },
    { consistent: true }
  );
  return Item;
}

export async function buscarCocineroRepository(cocineroId) {
  const { Item } = await MODELO_COCINERO.build(EntityRepository).get(
    { cocineroId },
    { consistent: true }
  );
  return Item;
}

export async function asignarCocineroRepository(comandaId, cocineroId, rol) {
  const asignacion = { comandaId, cocineroId, rol };
  await MODELO_ASIGNACION.build(EntityRepository).put(
    asignacion,
    { condition: { attr: 'comandaId', exists: false } }
  );
  return asignacion;
}
