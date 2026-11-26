#!/usr/bin/env bash
# Solo para una tabla nueva de referencia. En tu proyecto existente conserva sus datos.
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"TEATROS_${TALLER_EQUIPO}\" VALUE {'TEATRO_ID':1,'NOMBRE':'Teatro Aurora'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"TEATROS_${TALLER_EQUIPO}\" VALUE {'TEATRO_ID':2,'NOMBRE':'Teatro del Barrio'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"FUNCIONES_${TALLER_EQUIPO}\" VALUE {'FUNCION_ID':7,'NOMBRE':'La puerta azul','AFORO':350,'TEATRO_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"FUNCIONES_${TALLER_EQUIPO}\" VALUE {'FUNCION_ID':8,'NOMBRE':'Historias del andén','AFORO':250,'TEATRO_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"FUNCIONES_${TALLER_EQUIPO}\" VALUE {'FUNCION_ID':9,'NOMBRE':'La puerta azul · nuevo','AFORO':450,'TEATRO_ID':1}"
