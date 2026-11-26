import { crearAnimalService, listarAnimalesService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, edadMeses, refugioId } = JSON.parse(event.body);
  const animal = await crearAnimalService(nombre, edadMeses, refugioId);
  return { statusCode: 201, body: JSON.stringify(animal) };
}

export async function listarHandler() {
  const animales = await listarAnimalesService();
  return { statusCode: 200, body: JSON.stringify(animales) };
}
