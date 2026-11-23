import { PutItemCommand } from 'dynamodb-toolbox/entity/actions/put';
import { ScanCommand } from 'dynamodb-toolbox/table/actions/scan';
import { MODELO_OBRA, MODELO_AYUNTAMIENTO, TABLA_OBRAS } from '../../models/ayuntamiento-obra.model.mjs';

export async function crearObraRepository(obra) {
  await MODELO_OBRA.build(PutItemCommand)
    .item(obra)
    .options({ condition: { attr: 'obraId', exists: false } })
    .send();
}

export async function listarObrasRepository() {
  const { Items = [] } = await TABLA_OBRAS.build(ScanCommand)
    .entities(MODELO_OBRA)
    .options({ consistent: true })
    .send();
  return Items;
}
