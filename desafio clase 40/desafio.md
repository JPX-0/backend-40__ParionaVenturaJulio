# Consigna "MEJORAR LA ARQUITECTURA DE NUESTRA API":

* Modificar la capa de persistencia incorporando los conceptos de Factory, DAO, y DTO.
  > Ubicación: "./models"

* Los DAOs deben presentar la misma interfaz hacia la lógica de negocio de nuestro servidor.
  > Ubicación: "./models/daos"

* El DAO seleccionado será devuelto por una Factory para que la capa de negocio opere con el.
  > Ubicación: "./models/daos/daos.factory.js"

* Cada uno de estos casos de persistencia, deberán ser implementados usando el patrón singleton que impida crear nuevas instancias de estos mecanismos de acceso a los datos.
  > Ubicación: "./models/daos/cloud/mongo/collections"

* Comprobar que si llamo a la factory dos veces, con una misma opción elegida, devuelva la misma instancia.
  > Ubicación: "./data.test.js"

* Implementar el patrón Repository para la persistencia de productos y mensajes.
  > Ubicación: "./models.repositories"
