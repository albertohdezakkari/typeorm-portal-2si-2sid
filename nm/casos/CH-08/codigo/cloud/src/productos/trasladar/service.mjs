import { trasladarProductoRepository } from './repository.mjs';
import { buscarPanaderiaRepository } from '../../panaderias/consultar/repository.mjs';

export async function trasladarProductoService(productoId, panaderiaId) {
  const panaderia = await buscarPanaderiaRepository(panaderiaId);
  if (!panaderia) throw new Error('Panaderia no encontrado');
  return trasladarProductoRepository(productoId, panaderiaId);
}
