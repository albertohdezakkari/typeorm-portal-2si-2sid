import { PutItemCommand } from 'dynamodb-toolbox/entity/actions/put';
import { ScanCommand } from 'dynamodb-toolbox/table/actions/scan';
import { MODELO_PROFESIONAL, TABLA_PROFESIONALES } from '../../models/profesional-asignacion.model.mjs';

export async function crearProfesionalRepository(profesional) {
  await MODELO_PROFESIONAL.build(PutItemCommand)
    .item(profesional)
    .options({ condition: { attr: 'profesionalId', exists: false } })
    .send();
}

export async function listarProfesionalesRepository() {
  const { Items = [] } = await TABLA_PROFESIONALES.build(ScanCommand)
    .entities(MODELO_PROFESIONAL)
    .options({ consistent: true })
    .send();
  return Items;
}
