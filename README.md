### Proceso de Venta y Compra

#### 1. **Registro y Autenticación**

- **Seller**: El usuario se registra como `seller` proporcionando información personal y de contacto. Tras la autenticación, el `seller` puede acceder a su cuenta para gestionar sus propiedades.
- **Buyer**: El usuario se registra como `buyer` proporcionando información personal y de contacto. Tras la autenticación, el `buyer` puede explorar y comprar propiedades.

#### 2. **Publicación de Propiedades por el Seller**

1. **Listar Propiedad**:
   - El `seller` crea una nueva propiedad en la plataforma ingresando detalles como ubicación, precio, descripción, y fotos.
   - La propiedad es almacenada en la base de datos en la tabla de **Properties**.

2. **Aprobación de Propiedad (si aplica)**:
   - Un administrador revisa y aprueba la propiedad listada para asegurar que cumple con las políticas de la plataforma.
   - Una vez aprobada, la propiedad se vuelve visible para los `buyers`.

#### 3. **Exploración y Compra de Propiedades por el Buyer**

1. **Explorar Propiedades**:
   - El `buyer` navega por la plataforma y explora las propiedades listadas.
   - Utiliza filtros y búsquedas para encontrar propiedades de interés.

2. **Ver Detalles de Propiedad**:
   - El `buyer` selecciona una propiedad específica para ver detalles completos, incluyendo descripción, precio, ubicación, y fotos.

3. **Crear Orden de Compra**:
   - Si el `buyer` decide comprar la propiedad, crea una orden de compra proporcionando detalles del método de pago.
   - La orden de compra es almacenada en la base de datos en la tabla de **Orders**.

#### 4. **Proceso de Pago y Confirmación**

1. **Procesamiento del Pago**:
   - El `buyer` completa el proceso de pago utilizando el método de pago seleccionado (tarjeta de crédito, PayPal, criptomoneda).
   - Los detalles de la transacción son almacenados en la tabla de **OrderDetails**.

2. **Confirmación de la Orden**:
   - Una vez confirmado el pago, la orden de compra es actualizada a un estado de "completada".
   - Se genera una entrada en la tabla de **Sales** para registrar la venta.

#### 5. **Finalización de la Venta**

1. **Actualización de Estado**:
   - La propiedad se actualiza para reflejar que ha sido vendida y ya no está disponible para otros `buyers`.

2. **Notificación**:
   - El `buyer` y el `seller` reciben notificaciones sobre la finalización de la venta.

3. **Registro en Ventas**:
   - Los detalles de la venta, incluyendo información del `buyer`, `seller`, propiedad, y transacción, se almacenan en la tabla de **Sales**.

### Relaciones entre las Tablas

- **Properties**:
  - Cada propiedad tiene un `sellerId` que referencia al `seller` que la listó.

- **Orders**:
  - Cada orden tiene un `buyerId` que referencia al `buyer` que creó la orden.
  - Cada orden también tiene un `sellerId` que referencia al `seller` de la propiedad.
  - Cada orden referencia una propiedad específica con `propertyId`.

- **OrderDetails**:
  - Cada detalle de orden tiene un `orderId` que referencia a la orden correspondiente.
  - Cada detalle de orden puede tener referencias a productos específicos (en el caso de propiedades, esto puede incluir detalles adicionales del pago).

- **Sales**:
  - Cada venta tiene un `buyerId` y `sellerId` que referencian al `buyer` y `seller` involucrados en la transacción.
  - Cada venta referencia una propiedad específica con `propertyId`.
  - La venta también incluye detalles de la transacción, como el método de pago y el estado.

### Flujo General

1. **Seller** lista propiedad ➡️ **Properties**.
2. **Buyer** explora y decide comprar ➡️ **Orders**.
3. **Buyer** procesa el pago ➡️ **OrderDetails**.
4. Orden se completa ➡️ **Sales** registra la venta.
5. Propiedad se marca como vendida ➡️ Notificaciones a `buyer` y `seller`.

Este flujo asegura que cada acción realizada por el `seller` y el `buyer` se registra adecuadamente y se refleja en las tablas correspondientes, manteniendo un seguimiento claro y organizado de todas las transacciones y estados de las propiedades.


  // current-user
  // password
  // signin
  // signout
  // signup
