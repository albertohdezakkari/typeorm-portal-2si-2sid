import { eliminarProgramaRepository } from './repository.mjs';

export async function eliminarProgramaService(programaId) {
  await eliminarProgramaRepository(programaId);
}
