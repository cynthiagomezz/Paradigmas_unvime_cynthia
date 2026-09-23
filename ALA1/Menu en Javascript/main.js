const readLine = require("readline");
const Tarea = require("./tarea");
const GestorTareas = require("./gestorTareas");

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function validarFecha(vencimiento){
    const patronFecha = /^\d{4}\/\d{2}\/\d{2}$/;
    const validacionFecha = patronFecha.test(vencimiento);
    return validacionFecha;
}

const gestor = new GestorTareas();

function agregarTareaMenu() {
    console.log("\n=== Agregar Tarea ===\n");
    
    rl.question("Ingrese un título (mínimo 5 caracteres):\n", (resTitulo) => {
        const titulo = resTitulo.trim();

        if (!titulo || titulo.length < 5) {
            console.log("Título inválido. Debe tener al menos 5 caracteres.\n");
            return agregarTareaMenu();
        }

        rl.question("Ingrese la descripción:\n", (resDescripcion) => {
            const descripcion = resDescripcion.trim();

            function pedirFecha() {
                rl.question("Ingrese fecha de vencimiento (AAAA/MM/DD):\n", (resVencimiento) => {
                    const vencimiento = resVencimiento.trim();

                    if (!validarFecha(vencimiento) && vencimiento != "") {
                        console.log("¡Fecha inválida!\n");
                        return pedirFecha();
                    }

                    function pedirDificultad() {
                        rl.question("Dificultad: [1] Fácil [2] Media [3] Difícil\n", (resDif) => {
                            const opcionDificultad = Number(resDif.trim());

                            if (![1, 2, 3].includes(opcionDificultad)) {
                                console.log("Opción inválida. Ingrese una opción válida");
                                return pedirDificultad();
                            }

                            let dificultad = "Fácil";

                            if (opcionDificultad === 2) dificultad = "Media";
                            if (opcionDificultad === 3) dificultad = "Difícil";

                            const nuevaTarea = new Tarea(titulo, descripcion, vencimiento, dificultad);
                            gestor.agregarTarea(nuevaTarea);

                            console.log("\n¡Tarea ingresada con éxito!");
                            console.log(`Total de tareas: ${gestor.obtenerTodas().length}\n`);
                            menu();
                        });
                    }

                    pedirDificultad();
                });
            }

            pedirFecha();
        });
    });
}


function verTareasMenu() {
    const tareas = gestor.obtenerTodas();

    if (tareas.length < 1) {
        console.log("\nAún no hay tareas registradas.\n");
        return menu();
    }

    console.log("\n¿Qué tareas deseas ver?:\n");
    console.log("[1] Ver todas las tareas\n");
    console.log("[2] Ver tareas pendientes\n");
    console.log("[3] Ver tareas en proceso\n");
    console.log("[4] Ver tareas terminadas\n");
    console.log("[5] Ver tareas canceladas");
    console.log("[0] Volver al menú principal\n");

    rl.question("\nIngrese una opción: \n", (resOpcion) => {
        const opcion = resOpcion.trim();
        let filtradas = [];

        switch (opcion) {
            case "1":
                filtradas = gestor.obtenerTodas();
                break;

            case "2":
                filtradas = gestor.obtenerPorEstado("Pendiente");
                break;

            case "3":
                filtradas = gestor.obtenerPorEstado("En proceso");
                break;

            case "4":
                filtradas = gestor.obtenerPorEstado("Terminada");
                break;

            
            case "5":
                filtradas = gestor.obtenerPorEstado("Cancelada");
                break;

            case "0":
                return menu();

            default:
                console.log("Opción inválida.");
                return verTareasMenu();
        }

        console.log("\n--- Tareas Encontradas ---");

        if (filtradas.length === 0) {
            console.log("No hay tareas con ese estado.");
            console.log("\n[0] Volver\n");

            return rl.question("Ingrese una opción: ", (res) => {
                if (res.trim() === "0") {
                    return verTareasMenu();
                }

                console.log("Opción inválida.");
                return verTareasMenu();
            });
        }

        filtradas.forEach((tarea) => {
            console.log(`[ID: ${tarea.id}] ${tarea.titulo}`);
        });

        console.log("\n[0] Volver");

        
        verDetalleId(filtradas);

        console.log("-------------------------\n");
    });
}


function verDetalleId(filtradas) {
    rl.question("Ingrese el id de la tarea que desea ver:\n", (resId) => {
        let idBuscado = resId.trim();

        
        let tarea = filtradas.find((t) => String(t.id) === idBuscado);

        if (tarea != undefined) {
            console.log(`\nID: ${tarea.id}\n`);
            console.log(`Titulo: ${tarea.titulo}\n`);

            // CAMBIO: mostrar mensaje si está vacío
            if (tarea.descripcion != "") {
                console.log(`Descripcion: ${tarea.descripcion}\n`);
            } else {
                console.log("Descripcion: Sin descripción\n");
            }

            console.log(`Estado: ${tarea.estado}\n`);
            console.log(`Dificultad: ${tarea.dificultad}\n`);

           
            if (tarea.fechaVencimiento != "") {
                console.log(`Fecha de vencimiento: ${tarea.fechaVencimiento}\n`);
            } else {
                console.log("Fecha de vencimiento: Sin fecha\n");
            }

            console.log("\n=================\n");
            console.log("¿Que desea hacer?");
            console.log("\n[0] Volver\n");
            console.log("[1] Editar Tarea");
            console.log("[2] Eliminar Tarea");

            rl.question("Ingrese una opcion: ", (resOpc) => {
                let opciones = resOpc.trim();

                switch(opciones) {
                    case "0":
                        return verTareasMenu();

                    case "1":
                        EditarTarea(tarea);
                        break;

                    case "2":
                        // Todavía no está implementado
                        console.log("Eliminar tarea");
                        break;

                    default:
                        console.log("Opcion incorrecta, por favor ingrese una opcion valida.");
                        return verDetalleId(filtradas);
                }
            });
        } else {
            
            if (idBuscado === "0") {
                return verTareasMenu();
            }

            console.log("No se ha encontrado una tarea con ese id\n");
            return verDetalleId(filtradas);
        }
    });
}


function EditarTarea(tarea) {
    rl.question("Nuevo titulo: (enter para dejarlo igual)\n", (nuevoTitulo) => {

        if(nuevoTitulo.trim() != "") {

            if (nuevoTitulo.trim().length < 5) {
                console.log("Título inválido. Debe tener al menos 5 caracteres.");
                
                return EditarTarea(tarea);
            }

            tarea.titulo = nuevoTitulo.trim();
        }

        rl.question("Nueva Descripcion: (enter para dejarlo igual)\n", (nuevaDescripcion) => {

            if(nuevaDescripcion.trim() != "") {
                tarea.descripcion = nuevaDescripcion.trim();
            }

            rl.question("Ingrese una nueva fecha de vencimiento (AAAA/MM/DD): (enter para dejarlo igual)\n", nuevaFechaVencimiento => {

                if(!validarFecha(nuevaFechaVencimiento) && nuevaFechaVencimiento != ""){
                    console.log("Fecha invalida, por favor ingrese una fecha con formato correcto (AAAA/MM/DD)\n");
                    return EditarTarea(tarea);
                }

                if (nuevaFechaVencimiento.trim() !== ""){
                    tarea.fechaVencimiento = nuevaFechaVencimiento.trim();
                }

                rl.question("Ingrese nueva dificultad: [1] Facil [2] Media [3] Dificil (enter para dejar igual)\n", (nuevaDificultad) => {

                    
                    if(nuevaDificultad.trim() != "") {

                        const dificultad = Number(nuevaDificultad.trim());

                        if(![1,2,3].includes(dificultad)){
                            console.log("Opcion Invalida. Ingrese una opcion del 1 al 3 o enter para dejar igual. \n");
                            return EditarTarea(tarea);
                        }

                        if(dificultad === 1){
                            tarea.dificultad = "Fácil";
                        }

                        if(dificultad === 2){
                            tarea.dificultad = "Media";
                        }

                        if(dificultad === 3){
                            tarea.dificultad = "Difícil";
                        }
                    }

                    rl.question("Ingrese un nuevo estado: [1] Pendiente [2] En proceso [3] Terminada [4] Cancelada (enter para dejar igual)\n", (nuevoEstado) => {

                        
                        if(nuevoEstado.trim() != "") {

                            const opcionEstado = Number(nuevoEstado.trim());

                            if(![1,2,3,4].includes(opcionEstado)){
                                console.log("Opcion invalida. Por favor ingrese una opcion valida o ingrese enter para dejar igual.\n");
                                return EditarTarea(tarea);
                            }

                            if(opcionEstado === 1){
                                tarea.estado = "Pendiente";
                            }

                            if(opcionEstado === 2){
                                tarea.estado = "En proceso";
                            }

                            if(opcionEstado === 3){
                                tarea.estado = "Terminada";
                            }

                            if(opcionEstado === 4){
                                tarea.estado = "Cancelada";
                            }
                        }

                        console.log("==========");
                        console.log("Tarea guardada con exito");
                        console.log("==========\n");

                        menu();
                    });
                });
            });
        });
    });
}

//Buscar tarea 

function buscarTarea(){ rl.question("Ingrese un titulo o palabra clave de la tarea que desea buscar\n", (btarea) => { 
    const palabraBuscada = btarea.trim().toLowerCase();
    const encontrada = gestor.obtenerTodas().filter((t) => t.titulo.toLowerCase().includes(palabraBuscada) );
    if(encontrada.length === 0){ 
        console.log("No se ha encontrado ninguna tarea que coincida\n");
        console.log("[0] Volver\n");
        console.log("[1] Buscar otro titulo\n");
        rl.question("¿Que desea hacer?\n", (opcion) => { 
            switch(opcion.trim()){
                 case "0":
                 return menu();
                case "1":
                return buscarTarea();
                 default: console.log("Opcion invalida");
                 return buscarTarea(); } 
                 });
                } 
                else { 
                console.log("\n--- Tareas encontradas ---\n");
                encontrada.forEach((tarea) => {
                     console.log(`[ID: ${tarea.id}] ${tarea.titulo}`);
                      });
                     console.log("\n[0] Volver\n");
                    verDetalleId(encontrada);
                     }
                    });
                 }



function menu() {
    console.log("===================");
    console.log("Gestor de Tareas");
    console.log("===================");
    console.log("[1] Agregar tarea");
    console.log("[2] Ver tareas");
    console.log("[3] Buscar Tareas");
    console.log("[0] Salir");

    rl.question("\nIngrese una opción: \n", (respuesta) => {
        const opcion = respuesta.trim();

        switch (opcion) {
            case "1":
                agregarTareaMenu();
                break;

            case "2":
                verTareasMenu();
                break;

            // todavía falta buscar tarea
            case "3":
                buscarTarea();
                break;

            case "0":
                console.log("¡Hasta luego!");
                rl.close();
                break;

            default:
                console.log("Opción inválida.\n");
                menu();
                break;
        }
    });
}

menu();
