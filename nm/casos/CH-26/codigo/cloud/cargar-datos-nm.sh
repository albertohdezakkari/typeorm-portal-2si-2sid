#!/usr/bin/env bash
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"DOCENTES_${TALLER_EQUIPO}\" VALUE {'DOCENTE_ID':1,'NOMBRE':'Diego','APELLIDOS':'Ruiz López','EMAIL':'diego.ruiz@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"DOCENTES_${TALLER_EQUIPO}\" VALUE {'DOCENTE_ID':2,'NOMBRE':'Ana','APELLIDOS':'Vidal Sanz','EMAIL':'ana.vidal@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'AULA_ID':7,'DOCENTE_ID':1,'ROL':'Docencia'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'AULA_ID':7,'DOCENTE_ID':2,'ROL':'Apoyo'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'AULA_ID':8,'DOCENTE_ID':1,'ROL':'Coordinación'}"
