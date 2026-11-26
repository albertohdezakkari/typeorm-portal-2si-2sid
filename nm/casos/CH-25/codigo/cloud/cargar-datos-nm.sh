#!/usr/bin/env bash
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"LOCUTORES_${TALLER_EQUIPO}\" VALUE {'LOCUTOR_ID':1,'NOMBRE':'Diego','APELLIDOS':'Ruiz López','EMAIL':'diego.ruiz@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"LOCUTORES_${TALLER_EQUIPO}\" VALUE {'LOCUTOR_ID':2,'NOMBRE':'Ana','APELLIDOS':'Vidal Sanz','EMAIL':'ana.vidal@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'PROGRAMA_ID':7,'LOCUTOR_ID':1,'ROL':'Presentación'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'PROGRAMA_ID':7,'LOCUTOR_ID':2,'ROL':'Entrevistas'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'PROGRAMA_ID':8,'LOCUTOR_ID':1,'ROL':'Coordinación'}"
