#!/usr/bin/env bash
# Solo para una tabla nueva de referencia. En tu proyecto existente conserva sus datos.
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"GIMNASIOS_${TALLER_EQUIPO}\" VALUE {'GIMNASIO_ID':1,'NOMBRE':'Gimnasio Norte'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"GIMNASIOS_${TALLER_EQUIPO}\" VALUE {'GIMNASIO_ID':2,'NOMBRE':'Gimnasio Centro'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"SESIONES_${TALLER_EQUIPO}\" VALUE {'SESION_ID':7,'NOMBRE':'Pilates inicial','PLAZAS':34,'GIMNASIO_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"SESIONES_${TALLER_EQUIPO}\" VALUE {'SESION_ID':8,'NOMBRE':'Entrenamiento funcional','PLAZAS':24,'GIMNASIO_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"SESIONES_${TALLER_EQUIPO}\" VALUE {'SESION_ID':9,'NOMBRE':'Pilates inicial · nuevo','PLAZAS':44,'GIMNASIO_ID':1}"
