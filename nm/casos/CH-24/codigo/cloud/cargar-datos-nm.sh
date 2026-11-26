#!/usr/bin/env bash
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ENTRENADORES_${TALLER_EQUIPO}\" VALUE {'ENTRENADOR_ID':1,'NOMBRE':'Diego','APELLIDOS':'Ruiz López','EMAIL':'diego.ruiz@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ENTRENADORES_${TALLER_EQUIPO}\" VALUE {'ENTRENADOR_ID':2,'NOMBRE':'Ana','APELLIDOS':'Vidal Sanz','EMAIL':'ana.vidal@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'PISTA_ID':7,'ENTRENADOR_ID':1,'ROL':'Entrenamiento'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'PISTA_ID':7,'ENTRENADOR_ID':2,'ROL':'Supervisión'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'PISTA_ID':8,'ENTRENADOR_ID':1,'ROL':'Coordinación'}"
