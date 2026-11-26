#!/usr/bin/env bash
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"COCINEROS_${TALLER_EQUIPO}\" VALUE {'COCINERO_ID':1,'NOMBRE':'Diego','APELLIDOS':'Ruiz López','EMAIL':'diego.ruiz@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"COCINEROS_${TALLER_EQUIPO}\" VALUE {'COCINERO_ID':2,'NOMBRE':'Ana','APELLIDOS':'Vidal Sanz','EMAIL':'ana.vidal@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'COMANDA_ID':7,'COCINERO_ID':1,'ROL':'Preparación'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'COMANDA_ID':7,'COCINERO_ID':2,'ROL':'Emplatado'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'COMANDA_ID':8,'COCINERO_ID':1,'ROL':'Coordinación'}"
