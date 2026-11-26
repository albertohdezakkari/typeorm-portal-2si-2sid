#!/usr/bin/env bash
# Solo para una tabla nueva de referencia. En tu proyecto existente conserva sus datos.
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"TIENDAS_${TALLER_EQUIPO}\" VALUE {'TIENDA_ID':1,'NOMBRE':'Tienda Esquina'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"TIENDAS_${TALLER_EQUIPO}\" VALUE {'TIENDA_ID':2,'NOMBRE':'Tienda Centro'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ARTICULOS_${TALLER_EQUIPO}\" VALUE {'ARTICULO_ID':7,'NOMBRE':'Cuaderno azul','STOCK':72,'TIENDA_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ARTICULOS_${TALLER_EQUIPO}\" VALUE {'ARTICULO_ID':8,'NOMBRE':'Estuche verde','STOCK':60,'TIENDA_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ARTICULOS_${TALLER_EQUIPO}\" VALUE {'ARTICULO_ID':9,'NOMBRE':'Cuaderno azul · nuevo','STOCK':84,'TIENDA_ID':1}"
