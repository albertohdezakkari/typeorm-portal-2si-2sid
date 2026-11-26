import { eliminarFuncionRepository } from './repository.mjs';

export async function eliminarFuncionService(funcionId) {
  await eliminarFuncionRepository(funcionId);
}
