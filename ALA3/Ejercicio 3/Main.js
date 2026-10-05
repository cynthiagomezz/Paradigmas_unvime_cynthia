import * as readline from 'readline';
import { GestorTarea } from './GestorTarea.js';
import { Tarea } from './Tarea.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const listaTareas = [];
const gestor = new GestorTarea(listaTareas);


// validar fecha
function validarFecha(fecha){
    const patronFecha = /^\d{4}\/\d{2}\/\d{2}$/;
    return patronFecha.test(fecha);
}


// agregar tarea
function agregarTareaMenu(){
    console.log("\n=== Agregar Tarea ===\n");

    rl.question("Ingrese un titulo (minimo 5 caracteres):\n", (resTitulo) => {
        const titulo = resTitulo.trim();

        if(titulo.length < 5){
            console.log("El titulo debe tener al menos 5 caracteres.\n");
            return agregarTareaMenu();
        }

        rl.question("Ingrese la descripcion:\n", (resDescripcion) => {
            const descripcion = resDescripcion.trim();

            rl.question("Ingrese fecha de vencimiento (AAAA/MM/DD) o Enter para dejar vacio:\n", (resFecha) => {
                const fecha = resFecha.trim();

                if(fecha !== "" && !validarFecha(fecha)){
                    console.log("Fecha invalida.\n");
                    return agregarTareaMenu();
                }

                const nuevaTarea = new Tarea(titulo, descripcion, fecha);

                gestor.agregarTarea(nuevaTarea);

                console.log("\nTarea agregada correctamente.\n");

                menu();
            });
        });
    });
}


// mostrar tareas
function verTareasMenu(){
    if(gestor.obtenerTodasTareas().length === 0){
        console.log("\nAun no hay tareas agregadas.\n");
        return menu();
    }

    console.log("\n¿Qué tareas desea ver?\n");
    console.log("[1] Ver todas las tareas");
    console.log("[2] Ver tareas pendientes");
    console.log("[3] Ver tareas en proceso");
    console.log("[4] Ver tareas terminadas");
    console.log("[5] Ver tareas canceladas");
    console.log("[0] Volver\n");

    rl.question("Ingrese una opcion: ", (respuesta) => {

        let tareas;

        switch(respuesta.trim()){

            case "1":
                tareas = gestor.obtenerTodasTareas();
                break;

            case "2":
                tareas = gestor.obtenerPorEstado("Pendiente");
                break;

            case "3":
                tareas = gestor.obtenerPorEstado("En proceso");
                break;

            case "4":
                tareas = gestor.obtenerPorEstado("Terminada");
                break;

            case "5":
                tareas = gestor.obtenerPorEstado("Cancelada");
                break;

            case "0":
                return menu();

            default:
                console.log("Opcion invalida.\n");
                return verTareasMenu();
        }

        if(tareas.length === 0){
            console.log("No hay tareas con ese estado.\n");
            return verTareasMenu();
        }

        console.log("\n--- Tareas encontradas ---");

        tareas.forEach((tarea) => {
            console.log(`[Id: ${tarea.id}] ${tarea.titulo}`);
        });

        console.log("\n[0] Volver");

        verDetalleId(tareas);
    });
}


// buscar una tarea por titulo
function buscarTarea(){

    rl.question("\nIngrese el titulo o palabra que desea buscar:\n", (titulo) => {

        const encontradas = gestor.buscarTarea(titulo.trim());

        if(encontradas.length === 0){
            console.log("No se ha encontrado ninguna tarea que coincida.\n");
            console.log("[0] Volver");
            console.log("[1] Buscar otro titulo");

            rl.question("Ingrese una opcion: ", (opcion) => {

                if(opcion.trim() === "1"){
                    return buscarTarea();
                }

                return menu();
            });

            return;
        }

        console.log("\n--- Tareas encontradas ---\n");

        encontradas.forEach((tarea) => {
            console.log(`[Id: ${tarea.id}] ${tarea.titulo}`);
        });

        console.log("\n[0] Volver\n");

        verDetalleId(encontradas);
    });
}


// detalle de una tarea
function verDetalleId(tareas){

    rl.question("Ingrese el id de la tarea que desea ver:\n", (resId) => {

        const idBuscado = resId.trim();

        if(idBuscado === "0"){
            return verTareasMenu();
        }

        const tarea = tareas.find((tarea) => String(tarea.id) === idBuscado);

        if(!tarea){
            console.log("No se ha encontrado una tarea con ese id.\n");
            return verDetalleId(tareas);
        }

        tarea.detalleId();

        console.log("\n=================");
        console.log("[0] Volver");
        console.log("[1] Editar tarea");

                rl.question("Ingrese una opcion: ", (opcion) => {

            switch(opcion.trim()){

                case "0":
                    return verTareasMenu();

                case "1":
                    return editarTarea(tarea);

                default:
                    console.log("Opcion invalida.\n");
                    return verDetalleId(tareas);
            }
        });
    });
}

//editar tarea 

function editarTarea(tarea){

    rl.question("Nuevo titulo (Enter para dejarlo igual):\n", (nuevoTitulo) => {

        if(nuevoTitulo.trim() !== ""){

            if(nuevoTitulo.trim().length < 5){
                console.log("El titulo debe tener al menos 5 caracteres.\n");
                return editarTarea(tarea);
            }

            tarea.titulo = nuevoTitulo.trim();
        }

        rl.question("Nueva descripcion (Enter para dejarla igual):\n", (nuevaDescripcion) => {

            if(nuevaDescripcion.trim() !== ""){
                tarea.descripcion = nuevaDescripcion.trim();
            }

            rl.question("Nueva fecha de vencimiento (AAAA/MM/DD, Enter para dejarla igual):\n", (nuevaFecha) => {

                const fecha = nuevaFecha.trim();

                if(fecha !== "" && !validarFecha(fecha)){
                    console.log("Fecha invalida.\n");
                    return editarTarea(tarea);
                }

                if(fecha !== ""){
                    tarea.fechaDeVencimiento = fecha;
                }

                rl.question(
                    "Nueva dificultad: [1] Facil [2] Media [3] Dificil (Enter para dejarla igual):\n",
                    (nuevaDificultad) => {

                        const dificultad = nuevaDificultad.trim();

                        if(dificultad !== ""){

                            const opcion = Number(dificultad);

                            if(opcion < 1 || opcion > 3){
                                console.log("Opcion invalida.\n");
                                return editarTarea(tarea);
                            }

                            if(opcion === 1){
                                tarea.dificultad = "Facil";
                            }
                            else if(opcion === 2){
                                tarea.dificultad = "Media";
                            }
                            else{
                                tarea.dificultad = "Dificil";
                            }
                        }

                        rl.question(
                            "Nuevo estado: [1] Pendiente [2] En proceso [3] Terminada [4] Cancelada (Enter para dejarlo igual):\n",
                            (nuevoEstado) => {

                                const estado = nuevoEstado.trim();

                                if(estado !== ""){

                                    const opcion = Number(estado);

                                    if(opcion < 1 || opcion > 4){
                                        console.log("Opcion invalida.\n");
                                        return editarTarea(tarea);
                                    }

                                    if(opcion === 1){
                                        tarea.estado = "Pendiente";
                                    }
                                    else if(opcion === 2){
                                        tarea.estado = "En proceso";
                                    }
                                    else if(opcion === 3){
                                        tarea.estado = "Terminada";
                                    }
                                    else{
                                        tarea.estado = "Cancelada";
                                    }
                                }

                                console.log("\nTarea guardada con exito.\n");
                                menu();
                            }
                        );
                    }
                );
            });
        });
    });
}
function menu(){

    console.log("\n==============================");
    console.log("        GESTOR DE TAREAS");
    console.log("==============================\n");

    console.log("[1] Agregar tarea");
    console.log("[2] Ver tareas");
    console.log("[3] Buscar tarea");
    console.log("[0] Salir\n");

    rl.question("Ingrese una opcion: ", (opcion) => {

        switch(opcion.trim()){

            case "1":
                agregarTareaMenu();
                break;

            case "2":
                verTareasMenu();
                break;

            case "3":
                buscarTarea();
                break;

            case "0":
                console.log("\nPrograma finalizado.\n");
                rl.close();
                break;

            default:
                console.log("\nOpcion invalida.\n");
                menu();
        }
    });
}



menu();
