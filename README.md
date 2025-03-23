# Practica 07: Gestión del inventario de la Posada del Lobo Blanco

**Nombres de los integrantes:**

- Alberto Antonio Hernandez Hernandez
- Mario Guerra Pérez
- José Javier Ramos Carballo

## Índice

1. [Introducción](#1-introducción)
2. [Estructura de Ficheros del Proyecto](#2-estructura-de-ficheros-del-proyecto)
3. [Comandos para el funcionamiento de la practica]()
4. [Conclusiones]()
5. [Bibliografía]()

# 1. Introducción

En este proyecto en grupo, nos hemos dedicado a desarrollar la gestion del inventario de una de las posadas mas reconocibles del mundo de _The Witcher 3_

Bajo el ambiente de este mundo mágico, nuestro cometido se baso en preparar los diferentes agentes que intervenian en el inventario: mercaderes, clientes y bienes, y la gestion de sus compras, ventas y devoluciones

# 2. Estructura de Ficheros del Proyecto

## 📂 src
Contiene el código fuente principal del proyecto.

### 📂 cli
Interfaz de línea de comandos para interactuar con el sistema.


- 📂 clients
  - `addclient.ts` - Gestión de adición de clientes.
  - `client-menu.ts` - Menú para generar reportes.
  - `removeclient.ts` - Gestión de eliminación de clein.
  
- 📂 transactions
  - `addsupply.ts` - Gestión de la adición de proveedores.
  - `addtransaction.ts` - Gestión de la adición de transacciones.
  - `returntransaction.ts` - Gestión de devoluciones de transacciones.
  - `transaction-menu.ts` - Menu de gestión de transacciones.

- 📂 reports
  - `reports-menu.ts` - Menú para generar reportes.

### 📂 db
Módulos relacionados con la base de datos.

- `db_transaction.ts` - Gestión de transacciones en la base de datos.
- `db_clients.ts` - Gestión de clientes en la base de datos
- `db_merchants.ts` - Gestion de los mercaderes en la base de datos
- `db_good.ts` - Gestión de bienes en la base de datos.
- `db_transaction.json` - La base de datos de las transacciones.
- `db_clients.ts` - La base de datos de los clientes.
- `db_merchants.ts` - La base de datos de los mercaderes.
- `db_good.ts` - La base de datos de los bienes.

### 📂 models
Definición de las entidades principales del sistema.

- `good.ts` - Modelo de bienes.
- `client.ts` - Modelo de clientes.
- `merchant.ts` - Modelo de mercaderes.
- `shop.ts` - Modelo de ventas
- `shop.ts` - Modelo de compras
- `transaction.ts` - Modelo de ansacciones. 
- `return.ts` - Modelo de devoluciones.

### 📂 services
Servicios auxiliares para la lógica del sistema.

- `reportsmanager.ts` - Gestión de reportes como bienes más vendidos e ingresos
totales.
- `reportsma`

### 📂 enums
Enumeraciones utilizadas en el sistema.

- `materials.ts` - Enumeración de materiales disponibles.

## 📂 tests
Pruebas unitarias y de integración.

- `addtransaction.test.ts` - Pruebas para la funcionalidad de añadir transacciones.
- `returntransaction.test.ts` - Pruebas para la funcionalidad de devoluciones.
- `reportsmanager.test.ts` - Pruebas para la gestión de reportes.

## Otros Ficheros

- `README.md` - Documentación principal del proyecto.
- `.github/workflows/ci.yml` - Configuración de integración continua.
- `.gitignore` - Archivos y carpetas ignorados por Git.



[![CI Tests](https://github.com/ULL-ESIT-INF-DSI-2425/prct07-witcher-datamodel-groupo/actions/workflows/ci.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2425/prct07-witcher-datamodel-groupo/actions/workflows/ci.yml)

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2425/prct07-witcher-datamodel-groupo/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2425/prct07-witcher-datamodel-groupo?branch=main)  

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2425_prct07-witcher-datamodel-groupo&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2425_prct07-witcher-datamodel-groupo)