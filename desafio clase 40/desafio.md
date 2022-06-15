# Consigna "MEJORAR LA ARQUITECTURA DE NUESTRA API":

* Modificar la capa de persistencia incorporando los conceptos de Factory, DAO, y DTO.
  > Ubicación: "./src/models"

* Los DAOs deben presentar la misma interfaz hacia la lógica de negocio de nuestro servidor.
  > Ubicación: "./src/models/daos"

* El DAO seleccionado será devuelto por una Factory para que la capa de negocio opere con el.
  > Ubicación: "./src/models/daos/daos.factory.js"

* Cada uno de estos casos de persistencia, deberán ser implementados usando el patrón singleton que impida crear nuevas instancias de estos mecanismos de acceso a los datos.
  > Ubicación: "./src/models/daos/cloud/mongo/collections"

* Comprobar que si llamo a la factory dos veces, con una misma opción elegida, devuelva la misma instancia.
  > Ubicación: "./src/data.test.js"

* Implementar el patrón Repository para la persistencia de productos y mensajes.
  > Ubicación: "./src/models/repositories/collections"
