import { UpdateItemCommand } from 'dynamodb-toolbox/entity/actions/update';
import { MODELO_OBRA, MODELO_AYUNTAMIENTO, TABLA_OBRAS } from '../../models/ayuntamiento-obra.model.mjs';

export async function trasladarObraRepository(obraId, ayuntamientoId) {
  const { Attributes } = await MODELO_OBRA.build(UpdateItemCommand)
    .item({ obraId, ayuntamientoId })
    .options({
      condition: { attr: 'obraId', exists: true },
      returnValues: 'ALL_NEW'
    })
    .send();
  return Attributes;
}
