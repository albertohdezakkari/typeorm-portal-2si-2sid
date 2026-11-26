#!/usr/bin/env bash
# Solo para una tabla nueva de referencia. En tu proyecto existente conserva sus datos.
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ESCUELAS_${TALLER_EQUIPO}\" VALUE {'ESCUELA_ID':1,'NOMBRE':'Escuela Puente'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ESCUELAS_${TALLER_EQUIPO}\" VALUE {'ESCUELA_ID':2,'NOMBRE':'Escuela Encuentro'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"AULAS_${TALLER_EQUIPO}\" VALUE {'AULA_ID':7,'NOMBRE':'Aula Olmo','CAPACIDAD':42,'ESCUELA_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"AULAS_${TALLER_EQUIPO}\" VALUE {'AULA_ID':8,'NOMBRE':'Aula Pino','CAPACIDAD':30,'ESCUELA_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"AULAS_${TALLER_EQUIPO}\" VALUE {'AULA_ID':9,'NOMBRE':'Aula Olmo · nuevo','CAPACIDAD':54,'ESCUELA_ID':1}"
