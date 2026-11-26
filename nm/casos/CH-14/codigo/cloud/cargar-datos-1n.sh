#!/usr/bin/env bash
# Solo para una tabla nueva de referencia. En tu proyecto existente conserva sus datos.
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"PARQUES_${TALLER_EQUIPO}\" VALUE {'PARQUE_ID':1,'NOMBRE':'Parque del Agua'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"PARQUES_${TALLER_EQUIPO}\" VALUE {'PARQUE_ID':2,'NOMBRE':'Parque del Este'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ZONAS_${TALLER_EQUIPO}\" VALUE {'ZONA_ID':7,'NOMBRE':'Zona de juegos','CAPACIDAD':110,'PARQUE_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ZONAS_${TALLER_EQUIPO}\" VALUE {'ZONA_ID':8,'NOMBRE':'Zona de picnic','CAPACIDAD':80,'PARQUE_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ZONAS_${TALLER_EQUIPO}\" VALUE {'ZONA_ID':9,'NOMBRE':'Zona de juegos · nuevo','CAPACIDAD':140,'PARQUE_ID':1}"
