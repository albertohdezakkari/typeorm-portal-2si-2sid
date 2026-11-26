import { trasladarPlazaRepository } from './repository.mjs';
import { buscarUrbanizacionRepository } from '../../urbanizaciones/consultar/repository.mjs';

export async function trasladarPlazaService(plazaId, urbanizacionId) {
  const urbanizacion = await buscarUrbanizacionRepository(urbanizacionId);
  if (!urbanizacion) throw new Error('Urbanizacion no encontrado');
  return trasladarPlazaRepository(plazaId, urbanizacionId);
}
