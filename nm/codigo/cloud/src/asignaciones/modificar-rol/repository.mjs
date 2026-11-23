import { UpdateItemCommand } from 'dynamodb-toolbox/entity/actions/update';
import { MODELO_ASIGNACION } from '../../models/profesional-asignacion.model.mjs';

export async function modificarRolRepository(obraId, profesionalId, rol) {
  const { Attributes } = await MODELO_ASIGNACION.build(UpdateItemCommand)
    .item({ obraId, profesionalId, rol })
    .options({
      condition: { attr: 'obraId', exists: true },
      returnValues: 'ALL_NEW'
    })
    .send();
  return Attributes;
}
