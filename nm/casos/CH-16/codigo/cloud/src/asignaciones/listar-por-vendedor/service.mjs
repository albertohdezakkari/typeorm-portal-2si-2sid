import { listarAsignacionesPorVendedorRepository } from './repository.mjs';

export function listarAsignacionesPorVendedorService(vendedorId) {
  return listarAsignacionesPorVendedorRepository(vendedorId);
}
