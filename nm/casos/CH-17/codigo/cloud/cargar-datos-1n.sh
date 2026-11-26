#!/usr/bin/env bash
# Solo para una tabla nueva de referencia. En tu proyecto existente conserva sus datos.
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ESTUDIOS_${TALLER_EQUIPO}\" VALUE {'ESTUDIO_ID':1,'NOMBRE':'Estudio Prisma'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ESTUDIOS_${TALLER_EQUIPO}\" VALUE {'ESTUDIO_ID':2,'NOMBRE':'Estudio Lumen'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ESCENAS_${TALLER_EQUIPO}\" VALUE {'ESCENA_ID':7,'NOMBRE':'Escena de apertura','DURACION_SEGUNDOS':125,'ESTUDIO_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ESCENAS_${TALLER_EQUIPO}\" VALUE {'ESCENA_ID':8,'NOMBRE':'Escena del puente','DURACION_SEGUNDOS':95,'ESTUDIO_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ESCENAS_${TALLER_EQUIPO}\" VALUE {'ESCENA_ID':9,'NOMBRE':'Escena de apertura · nuevo','DURACION_SEGUNDOS':155,'ESTUDIO_ID':1}"
