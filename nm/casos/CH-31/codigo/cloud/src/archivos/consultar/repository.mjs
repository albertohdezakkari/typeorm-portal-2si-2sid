import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_DOCUMENTO, MODELO_ARCHIVO } from '../../models/archivo-documento.model.mjs';

export async function buscarArchivoRepository(archivoId) {
  const { Item } = await MODELO_ARCHIVO.build(EntityRepository).get(
    { archivoId },
    { consistent: true }
  );
  return Item ?? null;
}

export async function consultarArchivoRepository(archivoId, minimo) {
  const { Items = [] } = await MODELO_DOCUMENTO.build(EntityRepository).query(
    { index: 'PorArchivo', partition: archivoId },
    { filters: { Documento: { attr: 'paginas', gte: minimo } } }
  );
  return Items;
}
