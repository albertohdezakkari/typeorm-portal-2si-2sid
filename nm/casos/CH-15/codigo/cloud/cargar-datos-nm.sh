#!/usr/bin/env bash
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"COLABORADORES_${TALLER_EQUIPO}\" VALUE {'COLABORADOR_ID':1,'NOMBRE':'Diego','APELLIDOS':'Ruiz López','EMAIL':'diego.ruiz@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"COLABORADORES_${TALLER_EQUIPO}\" VALUE {'COLABORADOR_ID':2,'NOMBRE':'Ana','APELLIDOS':'Vidal Sanz','EMAIL':'ana.vidal@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'PROYECTO_ID':7,'COLABORADOR_ID':1,'ROL':'Desarrollo'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'PROYECTO_ID':7,'COLABORADOR_ID':2,'ROL':'Diseño'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'PROYECTO_ID':8,'COLABORADOR_ID':1,'ROL':'Coordinación'}"
