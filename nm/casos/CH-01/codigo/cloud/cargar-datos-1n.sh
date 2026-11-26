#!/usr/bin/env bash
# Solo para una tabla nueva de referencia. En tu proyecto existente conserva sus datos.
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"REFUGIOS_${TALLER_EQUIPO}\" VALUE {'REFUGIO_ID':1,'NOMBRE':'Refugio Norte'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"REFUGIOS_${TALLER_EQUIPO}\" VALUE {'REFUGIO_ID':2,'NOMBRE':'Refugio Sur'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ANIMALES_${TALLER_EQUIPO}\" VALUE {'ANIMAL_ID':7,'NOMBRE':'Nala','EDAD_MESES':32,'REFUGIO_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ANIMALES_${TALLER_EQUIPO}\" VALUE {'ANIMAL_ID':8,'NOMBRE':'Bruno','EDAD_MESES':24,'REFUGIO_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ANIMALES_${TALLER_EQUIPO}\" VALUE {'ANIMAL_ID':9,'NOMBRE':'Nala · nuevo','EDAD_MESES':40,'REFUGIO_ID':1}"
