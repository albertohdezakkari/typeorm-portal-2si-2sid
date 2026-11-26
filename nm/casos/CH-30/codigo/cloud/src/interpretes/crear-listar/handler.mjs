import { crearInterpreteService, listarInterpretesService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, apellidos, email } = JSON.parse(event.body);
  const interprete = await crearInterpreteService(nombre, apellidos, email);
  return { statusCode: 201, body: JSON.stringify(interprete) };
}

export async function listarHandler() {
  const interpretes = await listarInterpretesService();
  return { statusCode: 200, body: JSON.stringify(interpretes) };
}
