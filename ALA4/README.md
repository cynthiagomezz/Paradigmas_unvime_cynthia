ALA4 - Gestor de tareas

Descripción del proyecto:

Este proyecto consiste en un programa interactivo de gestión de tareas mediante un menú de opciones. El usuario puede agregar, editar, visualizar y buscar tareas.

Para desarrollarlo utilicé el enfoque de programación funcional. Organicé el programa en distintos módulos para separar las responsabilidades y mantener las funciones lo más independientes posible.

En el módulo principal se encuentra la lógica que conecta las distintas funcionalidades y maneja la interacción con el usuario. Allí se concentran principalmente las funciones impuras, ya que para el funcionamiento del programa es necesario solicitar datos y mostrar mensajes por consola.

A continuación, explico cómo organicé los módulos y qué función cumple cada uno.

 Módulos

Tarea.js:

En este primer módulo se encuentran las funciones relacionadas con la creación de una tarea y la validación de sus atributos.

La función principal es `crearTarea`, que se encarga de construir un objeto tarea con los atributos predefinidos.

También incluí las validaciones del título, la descripción y las fechas. Para estas últimas decidí crear funciones más pequeñas que luego utilizo dentro de una función principal llamada `validarFecha`. Esto se debe a que existen distintas condiciones que pueden hacer que una fecha no sea válida, por lo que me pareció mejor separar cada responsabilidad.

Estas funciones siguen el enfoque de programación funcional, ya que reciben los datos mediante parámetros, devuelven resultados y no dependen de variables globales ni modifican directamente los datos originales.

AgregarTarea.js:

En este módulo desarrollé la función encargada de agregar una nueva tarea al listado existente.

La función recibe el array de tareas y la nueva tarea que se quiere incorporar. En lugar de modificar directamente el array original, devuelve uno nuevo que contiene las tareas anteriores más la nueva.

Para esto utilicé el operador spread (`...`), de esta manera puedo conservar los elementos que ya estaban sin modificar el array original. Así trabajo con el principio de inmutabilidad.

MostrarTarea.js:

En este módulo incluí distintas funciones que permiten consultar y visualizar las tareas.

Una de ellas es la función para filtrar por estado, donde utilizo el método `filter` para devolver un nuevo array que contiene únicamente las tareas que cumplen con el estado solicitado.

También desarrollé una función para validar el estado, de manera que solamente se puedan utilizar los valores permitidos.

Otra función es la búsqueda por ID, donde utilizo el método `find` para obtener una tarea que coincida con el identificador ingresado. Como cada tarea tiene un ID único, solamente necesitamos encontrar una coincidencia.

Por último, tenemos la función que muestra el detalle de una tarea específica. Esta recibe directamente la tarea que ya encontramos mediante la búsqueda por ID, por lo que no necesita recorrer nuevamente el array.

En este módulo hay una combinación de funciones que trabajan directamente con los datos y otras que interactúan con el usuario. Por ejemplo, mostrar el detalle de una tarea por consola implica una operación impura, ya que produce un efecto externo.

BuscarTarea.js:

Este módulo se encarga de buscar tareas a partir de su título.

La función recibe el array de tareas y el texto que se quiere buscar. Utilizando `filter`, devuelve un nuevo array con las tareas cuyos títulos contienen el texto ingresado.

De esta manera, no es necesario escribir el título completo para encontrar una tarea, ya que también se pueden obtener coincidencias parciales.

EditarTarea.js:

En este módulo desarrollé dos funciones.

La primera se encarga de construir una nueva tarea a partir de una que ya existe, conservando los atributos que no se quieren modificar y reemplazando únicamente aquellos que el usuario decidió editar.

La segunda función se encarga de devolver un nuevo array con todas las tareas originales y la tarea modificada en la misma posición que ocupaba anteriormente.

Aunque estas funciones se utilizan para editar información, siguen respetando el principio de inmutabilidad, ya que no modifican directamente los atributos del objeto original ni el array. En su lugar, crean una nueva tarea y un nuevo array con los cambios correspondientes.

Archivos.js:

En este módulo trabajé con la persistencia de datos. El objetivo es evitar que las tareas se pierdan cuando cerramos el programa, permitiendo guardarlas en un archivo y recuperarlas cuando volvemos a ejecutarlo.

Para esto utilicé el módulo `fs/promises` de Node.js, que permite trabajar con archivos de manera asíncrona.

Desarrollé una función para leer los datos del archivo. Primero recupera su contenido, que se encuentra en formato JSON, y luego utiliza `JSON.parse()` para convertirlo nuevamente en estructuras de JavaScript con las que podemos trabajar.

Un detalle que tuve que resolver fue el manejo de las fechas. Al convertir los datos de JavaScript a JSON, los objetos `Date` se guardan como texto. Por eso, cuando recuperamos las tareas, es necesario volver a convertir esos valores utilizando `new Date()` para poder trabajar nuevamente con fechas.

También incorporé el manejo de errores mediante `try/catch`. Si el archivo no existe, se contempla esa situación para iniciar el programa con un array vacío. En cambio, si ocurre otro error, como un problema con el formato del JSON, se informa para poder identificarlo.

Por otro lado, desarrollé la función encargada de guardar los datos. Esta utiliza `JSON.stringify()` para convertir el array de tareas a formato JSON y escribirlo en el archivo.

Programa principal:

Este es el módulo que conecta todas las funcionalidades del programa y se encarga de gestionar la interacción con el usuario.

Para poder interactuar desde la terminal utilicé `readline` de Node.js y desarrollé una función que facilita la realización de preguntas y la recepción de respuestas.

También trabajé con promesas y programación asíncrona utilizando `async/await`. Esto permite que el programa espere la respuesta del usuario antes de continuar con las siguientes instrucciones.

En este módulo se encuentran las funciones que manejan las distintas opciones del menú, solicitan los datos necesarios, realizan las validaciones y llaman a las funciones correspondientes de los demás módulos.

Es también donde se manejan principalmente las operaciones impuras, ya que es necesario interactuar con el usuario mediante la consola y trabajar con la lectura y escritura de información.

Conceptos utilizados:

Durante el desarrollo de este trabajo utilicé y puse en práctica distintos conceptos:

- Programación funcional.
- Funciones puras e impuras.
- Inmutabilidad.
- Modularización.
- Funciones de orden superior.
- Métodos `map`, `filter` y `find`.
- Operador spread (`...`).
- Objetos y arrays.
- Validación de datos.
- Manejo de fechas con `Date`.
- Promesas y programación asíncrona.
- `async/await`.
- Manejo de errores con `try/catch`.
- Persistencia de datos mediante archivos JSON.
- Importación y exportación de módulos.

Tecnologías utilizadas:

- JavaScript.
- Node.js.
- Visual Studio Code.
- Git y GitHub.

Ejecución del programa:

Para ejecutar el programa es necesario tener Node.js instalado.

Desde una terminal, ubicarse en la carpeta del proyecto y ejecutar el archivo principal:

```bash
node index.js
```

Reflexión sobre el desarrollo:

Este trabajo me permitió llevar a la práctica los conceptos de programación funcional y entender mejor cómo organizar un programa mediante módulos.

Durante el desarrollo tuve que resolver distintas situaciones que me llevaron a investigar y aprender herramientas que no había utilizado anteriormente, como el manejo de archivos, la conversión de datos JSON, las promesas y la programación asíncrona.

También pude comprender mejor la importancia de la inmutabilidad y de separar las responsabilidades de cada función, intentando que cada una se encargue de una tarea específica.

Uno de los desafíos fue lograr que todas las partes funcionaran correctamente en conjunto, especialmente al integrar la interacción con el usuario y la persistencia de los datos.

En general, fue un trabajo en el que no solamente puse en práctica lo aprendido, sino que también tuve que investigar y aplicar nuevos conceptos para poder completar el programa.
