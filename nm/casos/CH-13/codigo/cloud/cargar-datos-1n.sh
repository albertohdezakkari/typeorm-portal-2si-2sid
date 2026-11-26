#!/usr/bin/env bash
# Solo para una tabla nueva de referencia. En tu proyecto existente conserva sus datos.
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"CINES_${TALLER_EQUIPO}\" VALUE {'CINE_ID':1,'NOMBRE':'Cine Alameda'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"CINES_${TALLER_EQUIPO}\" VALUE {'CINE_ID':2,'NOMBRE':'Cine del Parque'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"PROYECCIONES_${TALLER_EQUIPO}\" VALUE {'PROYECCION_ID':7,'PELICULA':'Viaje al norte','DURACION_MINUTOS':215,'CINE_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"PROYECCIONES_${TALLER_EQUIPO}\" VALUE {'PROYECCION_ID':8,'PELICULA':'La última estación','DURACION_MINUTOS':125,'CINE_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"PROYECCIONES_${TALLER_EQUIPO}\" VALUE {'PROYECCION_ID':9,'PELICULA':'Viaje al norte · nuevo','DURACION_MINUTOS':305,'CINE_ID':1}"
