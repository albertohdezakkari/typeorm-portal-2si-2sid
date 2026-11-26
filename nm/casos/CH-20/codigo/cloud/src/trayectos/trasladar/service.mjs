import { trasladarTrayectoRepository } from './repository.mjs';
import { buscarEstacionRepository } from '../../estaciones/consultar/repository.mjs';

export async function trasladarTrayectoService(trayectoId, estacionId) {
  const estacion = await buscarEstacionRepository(estacionId);
  if (!estacion) throw new Error('Estacion no encontrado');
  return trasladarTrayectoRepository(trayectoId, estacionId);
}
