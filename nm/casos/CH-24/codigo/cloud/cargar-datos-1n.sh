#!/usr/bin/env bash
# Solo para una tabla nueva de referencia. En tu proyecto existente conserva sus datos.
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"COMPLEJOS_${TALLER_EQUIPO}\" VALUE {'COMPLEJO_ID':1,'NOMBRE':'Complejo Municipal'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"COMPLEJOS_${TALLER_EQUIPO}\" VALUE {'COMPLEJO_ID':2,'NOMBRE':'Complejo del Barrio'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"PISTAS_${TALLER_EQUIPO}\" VALUE {'PISTA_ID':7,'NOMBRE':'Pista cubierta','SUPERFICIE_M2':420,'COMPLEJO_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"PISTAS_${TALLER_EQUIPO}\" VALUE {'PISTA_ID':8,'NOMBRE':'Pista exterior','SUPERFICIE_M2':300,'COMPLEJO_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"PISTAS_${TALLER_EQUIPO}\" VALUE {'PISTA_ID':9,'NOMBRE':'Pista cubierta · nuevo','SUPERFICIE_M2':540,'COMPLEJO_ID':1}"
