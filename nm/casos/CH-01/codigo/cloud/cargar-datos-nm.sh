#!/usr/bin/env bash
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"CUIDADORES_${TALLER_EQUIPO}\" VALUE {'CUIDADOR_ID':1,'NOMBRE':'Diego','APELLIDOS':'Ruiz López','EMAIL':'diego.ruiz@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"CUIDADORES_${TALLER_EQUIPO}\" VALUE {'CUIDADOR_ID':2,'NOMBRE':'Ana','APELLIDOS':'Vidal Sanz','EMAIL':'ana.vidal@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'ANIMAL_ID':7,'CUIDADOR_ID':1,'ROL':'Alimentación'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'ANIMAL_ID':7,'CUIDADOR_ID':2,'ROL':'Seguimiento sanitario'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'ANIMAL_ID':8,'CUIDADOR_ID':1,'ROL':'Coordinación'}"
