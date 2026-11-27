import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ARCHIVO } from '../../models/archivo-documento.model.mjs';

export async function crearArchivoRepository(archivo) {
  await MODELO_ARCHIVO.build(EntityRepository).put(
    archivo,
    { condition: { attr: 'archivoId', exists: false } }
  );
}

export async function listarArchivosRepository() {
  const { Items = [] } = await MODELO_ARCHIVO.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}