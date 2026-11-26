#!/usr/bin/env bash
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"INSTRUCTORES_${TALLER_EQUIPO}\" VALUE {'INSTRUCTOR_ID':1,'NOMBRE':'Diego','APELLIDOS':'Ruiz López','EMAIL':'diego.ruiz@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"INSTRUCTORES_${TALLER_EQUIPO}\" VALUE {'INSTRUCTOR_ID':2,'NOMBRE':'Ana','APELLIDOS':'Vidal Sanz','EMAIL':'ana.vidal@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'SESION_ID':7,'INSTRUCTOR_ID':1,'ROL':'Calentamiento'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'SESION_ID':7,'INSTRUCTOR_ID':2,'ROL':'Entrenamiento'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'SESION_ID':8,'INSTRUCTOR_ID':1,'ROL':'Coordinación'}"
