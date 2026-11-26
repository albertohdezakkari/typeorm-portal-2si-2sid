#!/usr/bin/env bash
# Solo para una tabla nueva de referencia. En tu proyecto existente conserva sus datos.
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"CAFETERIAS_${TALLER_EQUIPO}\" VALUE {'CAFETERIA_ID':1,'NOMBRE':'Cafetería Plaza'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"CAFETERIAS_${TALLER_EQUIPO}\" VALUE {'CAFETERIA_ID':2,'NOMBRE':'Cafetería Jardín'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"COMANDAS_${TALLER_EQUIPO}\" VALUE {'COMANDA_ID':7,'NOMBRE':'Comanda C-01','IMPORTE_CENTIMOS':1700,'CAFETERIA_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"COMANDAS_${TALLER_EQUIPO}\" VALUE {'COMANDA_ID':8,'NOMBRE':'Comanda C-02','IMPORTE_CENTIMOS':1250,'CAFETERIA_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"COMANDAS_${TALLER_EQUIPO}\" VALUE {'COMANDA_ID':9,'NOMBRE':'Comanda C-01 · nuevo','IMPORTE_CENTIMOS':2150,'CAFETERIA_ID':1}"
