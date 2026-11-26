#!/usr/bin/env bash
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"TECNICOS_${TALLER_EQUIPO}\" VALUE {'TECNICO_ID':1,'NOMBRE':'Diego','APELLIDOS':'Ruiz López','EMAIL':'diego.ruiz@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"TECNICOS_${TALLER_EQUIPO}\" VALUE {'TECNICO_ID':2,'NOMBRE':'Ana','APELLIDOS':'Vidal Sanz','EMAIL':'ana.vidal@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'PLAZA_ID':7,'TECNICO_ID':1,'ROL':'Inspección'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'PLAZA_ID':7,'TECNICO_ID':2,'ROL':'Mantenimiento'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'PLAZA_ID':8,'TECNICO_ID':1,'ROL':'Coordinación'}"
