#!/usr/bin/env bash
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"JARDINEROS_${TALLER_EQUIPO}\" VALUE {'JARDINERO_ID':1,'NOMBRE':'Diego','APELLIDOS':'Ruiz López','EMAIL':'diego.ruiz@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"JARDINEROS_${TALLER_EQUIPO}\" VALUE {'JARDINERO_ID':2,'NOMBRE':'Ana','APELLIDOS':'Vidal Sanz','EMAIL':'ana.vidal@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'PLANTA_ID':7,'JARDINERO_ID':1,'ROL':'Riego'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'PLANTA_ID':7,'JARDINERO_ID':2,'ROL':'Tratamiento'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'PLANTA_ID':8,'JARDINERO_ID':1,'ROL':'Coordinación'}"
