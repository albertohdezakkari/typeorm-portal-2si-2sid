import { GetItemCommand } from 'dynamodb-toolbox/entity/actions/get';
import { PutItemCommand } from 'dynamodb-toolbox/entity/actions/put';
import { MODELO_OBRA } from '../../models/ayuntamiento-obra.model.mjs';
import { MODELO_PROFESIONAL, MODELO_ASIGNACION } from '../../models/profesional-asignacion.model.mjs';

export async function buscarObraRepository(obraId) {
  const { Item } = await MODELO_OBRA.build(GetItemCommand)
    .key({ obraId }).options({ consistent: true }).send();
  return Item;
}

export async function buscarProfesionalRepository(profesionalId) {
  const { Item } = await MODELO_PROFESIONAL.build(GetItemCommand)
    .key({ profesionalId }).options({ consistent: true }).send();
  return Item;
}

export async function asignarProfesionalRepository(obraId, profesionalId, rol) {
  const asignacion = { obraId, profesionalId, rol };
  await MODELO_ASIGNACION.build(PutItemCommand)
    .item(asignacion)
    .options({ condition: { attr: 'obraId', exists: false } })
    .send();
  return asignacion;
}
