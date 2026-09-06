# Entrega 7

## Configuración

Para ejecutar el proyecto correctamente es necesario crear un archivo `.env` a partir del archivo de ejemplo:

```bash
.env.example
```

El archivo `.env` debe contener todas las variables de entorno requeridas por la aplicación.

> **Importante:** si falta alguna variable de entorno obligatoria, la aplicación no se iniciará y mostrará en la consola una lista con las variables faltantes.

---

## Tests

El proyecto cuenta con un comando configurado en `package.json` para ejecutar los tests mediante **Mocha**.

Para ejecutarlos:

```bash
npm test
```

### Variables de entorno para tests

Los tests requieren un archivo:

```bash
.env.test
```

Este archivo debe contener como mínimo:

```env
NODE_ENV=test
MONGODB_URI=string_de_conexion
```

La variable `NODE_ENV=test` permite aislar la base de datos utilizada durante los tests.

> **Advertencia:** al finalizar la ejecución de los tests, la base de datos utilizada se elimina por completo. Por este motivo, no se utiliza la base de datos de producción.

---

# Endpoints

Todos los endpoints aceptan solicitudes con:

```http
Content-Type: application/json
```

Cuando un endpoint también admita:

```http
Content-Type: multipart/form-data
```

se indicará explícitamente en su descripción.

---

## Rutas auxiliares

### Documentación Swagger

Obtiene la documentación interactiva de la API.

```http
GET /api/docs
```

---

### Test del logger

Ejecuta una prueba utilizando todos los niveles configurados del logger.

```http
GET /logger-test
```

---

# Rutas de usuarios

### Obtener todos los usuarios

```http
GET /api/users
```

---

### Obtener un usuario por ID

```http
GET /api/users/:id
```

---

### Crear un usuario

Admite `multipart/form-data`.

```http
POST /api/users
```

---

### Actualizar un usuario

Admite `multipart/form-data`.

```http
PATCH /api/users/:id
```

---

### Eliminar un usuario

```http
DELETE /api/users/:id
```

---

# Rutas de pedidos (Orders)

### Obtener todos los pedidos

```http
GET /api/orders
```

---

### Obtener un pedido por ID

```http
GET /api/orders/:id
```

---

### Crear un pedido

```http
POST /api/orders/:id
```

---

### Actualizar el estado de un pedido

El estado se especifica mediante el parámetro `:estado`.
Acepta como valores `created`, `assigned`, `picked_up`, `in_transit`, `delivered` y `cancelled`.

```http
POST /api/orders/:id/status/:estado
```

---

# Rutas de envíos (Deliveries)

### Obtener todos los envíos

```http
GET /api/deliveries
```

---

### Obtener un envío por ID

```http
GET /api/deliveries/:id
```

---

### Crear un envío

```http
POST /api/deliveries
```

---

### Actualizar un envío

Admite `multipart/form-data`.

```http
PATCH /api/deliveries/:id
```

---

# Rutas de mocks

Las rutas de generación de datos mock están disponibles únicamente cuando `NODE_ENV` tiene un valor distinto de `production`.

## Parámetro `qty`

Los endpoints de mocks reciben mediante query parameter el parámetro `qty`, que indica la cantidad de elementos que se desean generar, cuenta como `mínimo 1` y `máximo 100`.

---

## Mocking Users

Genera usuarios ficticios sin guardarlos en la base de datos.

```http
GET /api/mocks/mocking-users
```
---

## Mocking Orders

Genera pedidos ficticios sin guardarlos en la base de datos.

```http
GET /api/mocks/mocking-orders
```
---

## Mocking Deliveries

Genera envíos ficticios sin guardarlos en la base de datos.

```http
GET /api/mocks/mocking-deliveries
```
---

# Generación de datos persistentes

Este endpoint permite generar datos mock y guardarlos en la base de datos.

```http
POST /api/mocks/generateData
```

Acepta como query parameters `qty` y `type`.

### Valores de `type`

- `users`: genera usuarios.
- `orders`: genera pedidos.
- `deliveries`: genera envíos.

### Ejemplo

```http
POST /api/mocks/generateData?qty=5&type=deliveries
```

Este endpoint generará 5 envíos mock y los guardará en la base de datos.