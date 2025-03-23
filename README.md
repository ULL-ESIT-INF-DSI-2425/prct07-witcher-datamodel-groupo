# Practica 07: Gestión del inventario de la Posada del Lobo Blanco

**Nombres de los integrantes:**

- Alberto Antonio Hernandez Hernandez
- Mario Guerra Pérez
- José Javier Ramos Carballo

[![CI Tests](https://github.com/ULL-ESIT-INF-DSI-2425/prct07-witcher-datamodel-groupo/actions/workflows/ci.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2425/prct07-witcher-datamodel-groupo/actions/workflows/ci.yml)

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2425/prct07-witcher-datamodel-groupo/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2425/prct07-witcher-datamodel-groupo?branch=main)  

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2425_prct07-witcher-datamodel-groupo&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2425_prct07-witcher-datamodel-groupo)

## Índice

1. [Introducción](#1-introducción)
2. [Estructura de Ficheros del Proyecto](#2-estructura-de-ficheros-del-proyecto)
3. [Comandos para el funcionamiento de la practica](#3-comandos-para-el-funcionamiento-de-la-practica)
4. [Conclusiones](#4-conclusiones)
5. [Bibliografía](#5-bibliografía)

# 1. Introducción

En este proyecto en grupo, nos hemos dedicado a desarrollar la gestion del inventario de una de las posadas mas reconocibles del mundo de _The Witcher 3_

Bajo el ambiente de este mundo mágico, nuestro cometido se baso en preparar los diferentes agentes que intervenian en el inventario: mercaderes, clientes y bienes, y la gestion de sus compras, ventas y devoluciones

# 2. Estructura de Ficheros del Proyecto

## 📂 src
Contiene el código fuente principal del proyecto.

### 📂 cli
Interfaz de línea de comandos para interactuar con el sistema.

  - `main-menu.ts` - Programa principal del proyecto.

- 📂 clients
  - `addclient.ts` - Gestión de adición de clientes.
  - `client-menu.ts` - Menú para generar reportes de clientes.
  - `removeclient.ts` - Gestión de eliminación de cliente.
  - `searchclient.ts` - Gestion de busqueda de clientes.
  - `updateclient.ts` - Gesión de modificacion de clientes.

- 📂 merchants
  - `addmerchant.ts` - Gestión de adición de mercaderes.
  - `merchant-menu.ts` - Menú para generar reportes de mercaderes.
  - `removemerchant.ts` - Gestión de eliminación de mercaderes.
  - `searchmerchant.ts` - Gestion de busqueda de mercaderes.
  - `updatemerchant.ts` - Gesión de modificacion de mercaderes.

- 📂 goods
  - `addgood.ts` - Gestión de adición de bienes.
  - `goods-menu.ts` - Menú para generar bienes.
  - `removegood.ts` - Gestión de eliminación de bienes.
  - `searchgood.ts` - Gestion de busqueda de bienes.
  - `updategood.ts` - Gesión de modificacion de bienes.
  
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

### 📂 interfaces
Definición de las interfaces del sistema.

- `db_good.ts` - Interfaz de la base de datos de bienes.
- `db_clients.ts` - Interfaz de la base de datos de clientes.
- `db_trnasactions.ts` - Interfaz de la base de datos de transacciones.
- `merchantinfo.ts` - Interfaz de los mercaderes.
- `goodinfo.ts` - Interfaz de los bienes
- `clientinfo.ts` - Interfaz de los clientes

### 📂 services
Servicios auxiliares para la lógica del sistema.

- `reportsmanager.ts` - Gestión de reportes como bienes más vendidos e ingresos
totales.
- `dbmanager.ts` - Gestor principal de las tres bases de datos de clientes, mercaderes y bienes

### 📂 enums
Enumeraciones utilizadas en el sistema.

- `materials.ts` - Enumeración de materiales disponibles.
- `locations.ts` - Enumeración de localizaciones disponibles.
- `merchantType.ts` - Enumeración de tipos de mercader disponibles.
- `races.ts` - Enumeración de razas disponibles.

## 📂 tests
Pruebas TDD y de integración.

### 📂 db
Pruebas relativas a las bases de datos.

- `db_clients.spec.ts` - Pruebas para la base de datos de clientes.
- `db_good.spec.ts` - Pruebas para la base de datos de bienes.
- `db_merchants.spec.ts` - Pruebas para la base de datos de mercaderes.
- `db_transactions.spec.ts` - Pruebas para la base de datos de transacciones.

### 📂 errors
Pruebas relativas a los gestores de errores.

- `apperror.spec.ts` - Pruebas relativas al gestor AppError.
- `iderror.spec.ts` - Pruebas relativas al gestor IdError.
- `locationerror.spec.ts` - Pruebas relativas al gestor LocationError.
- `materialerror.spec.ts` - Pruebas relativas al gestor MaterialError.
- `merchanterror.spec.ts` - Pruebas relativas al gestor MerchantError.
- `raceerror.spec.ts` - Pruebas relativas al gestor RaceError.
- `takeniderror.spec.ts` - Pruebas relativas al gestor TakenIdError.

### 📂 models
Pruebas relativas a los modelos de datos en el inventario.

- `client.spec.ts` - Pruebas relativas al modelo de datos de los clientes.
- `good.spec.ts` - Pruebas relativas al modelo de datos de los bienes.
- `merchant.spec.ts` - Pruebas relativas al modelo de datos de los mercaderes.

### 📂 services
Pruebas relativas a los servicios de sobre los bienes, clientes y mercaderes.

- `dbmanager.spec.ts` - Pruebas relativas a la clase DBManager.
- `reportsmanager.spec.ts` - Pruebas relativas a la clase ReportsManager.

## Otros Ficheros

- `README.md` - Documentación principal del proyecto.
- `.github/workflows/*.yml` - Configuración mediante flujos de trabajo.
- `.gitignore` - Archivos y carpetas ignorados por Git.



# 3. Comandos para el funcionamiento de la practica

* Instalación de dependencias:
  ```
  npm install
  ```
* Para la ejecución de la **Aplicación de gestión de inventario de la posada El Lobo Blanco**, se deberá usar el comando:
  ```
  npm run app
  ```

* Para la ejecución de las pruebas, se deberá usar el comando:
  ```
  npm run coverage
  ```


# 4. Conclusiones

Gracias a los retos que nos ha supuesto este proyecto, hemos profundizado en los usos que nos aporta el lenguaje **TypeScript** para desarrollos que trabajan la persistencia de los datos, el tratamiento de ellos mediante ficheros JSON, el uso de modulos puros para aumentar las posibilidades de trabajos que se pueden realizar con el, el uso de diferentes flujos de trabajo que corroboren las pruebas que cubren nuestro codigo, asi como la calidad de estos...

# 5. Bibliografía

1. **Enunciado de la práctica:** [https://ull-esit-inf-dsi-2425.github.io/prct07-witcher-dataModel/](https://ull-esit-inf-dsi-2425.github.io/prct07-witcher-dataModel/) 

2. **Inquirer:** [https://www.npmjs.com/package/inquirer](https://www.npmjs.com/package/inquirer)

3. **LowDB:** [https://www.npmjs.com/package/lowdb](https://www.npmjs.com/package/lowdb)

4. **TSDoc:** [https://tsdoc.org](https://tsdoc.org)

5. **Coveralls:** [https://coveralls.io/github/ULL-ESIT-INF-DSI-2425/prct07-witcher-datamodel-groupo?branch=main](https://coveralls.io/github/ULL-ESIT-INF-DSI-2425/prct07-witcher-datamodel-groupo?branch=main)

6. **SonarQube Cloud:** [https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2425_prct07-witcher-datamodel-groupo](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2425_prct07-witcher-datamodel-groupo)
