import { buscarUrbanizacionRepository, consultarUrbanizacionRepository } from './repository.mjs';

export async function consultarUrbanizacionService(urbanizacionId, minimo) {
  const urbanizacion = await buscarUrbanizacionRepository(urbanizacionId);
  if (!urbanizacion) throw new Error('Urbanizacion no encontrado');
  const plazas = await consultarUrbanizacionRepository(urbanizacionId, minimo);
  return { urbanizacion, plazas };
}
