import * as readline from "readline";
import Tarea, { Dificultad, Estado } from "./Tarea";
import GestorTarea from "./GestorTarea";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const gestor = new GestorTarea();

function validarFecha(vencimiento: string): boolean {
    const patronFecha = /^\d{4}\/\d{2}\/\d{2}$/;
    return patronFecha.test(vencimiento);
}

function agregarTareaMenu(): void {
    console.log("\n=== Agregar Tarea ===\n");

    rl.question("Ingrese un título (mínimo 5 caracteres):\n", (resTitulo) => {
        const titulo = resTitulo.trim();

        if (!titulo || titulo.length < 5) {
            console.log("Título inválido. Debe tener al menos 5 caracteres.\n");
            return agregarTareaMenu();
        }

        rl.question("Ingrese la descripción:\n", (resDescripcion) => {
            const descripcion = resDescripcion.trim();

            function pedirFecha(): void {
                rl.question(
                    "Ingrese fecha de vencimiento (AAAA/MM/DD):\n",
                    (resVencimiento) => {
                        const vencimiento = resVencimiento.trim();

                        if (vencimiento !== "" && !validarFecha(vencimiento)) {
                            console.log("¡Fecha inválida!\n");
                            return pedirFecha();
                        }

                        function pedirDificultad(): void {
                            rl.question(
                                "Dificultad: [1] Fácil [2] Media [3] Difícil\n",
                                (resDif) => {
                                    const opcionDificultad = Number(resDif.trim());

                                    if (![1, 2, 3].includes(opcionDificultad)) {
                                        console.log(
                                            "Opción inválida. Ingrese una opción válida.\n"
                                        );
                                        return pedirDificultad();
                                    }

                                    const dificultad: Dificultad =
                                        opcionDificultad === 1
                                            ? "Fácil"
                                            : opcionDificultad === 2
                                              ? "Media"
                                              : "Difícil";

                                    const nuevaTarea = new Tarea(
                                        titulo,
                                        descripcion,
                                        vencimiento,
                                        dificultad
                                    );

                                    gestor.agregarTarea(nuevaTarea);
                                    console.log("\n¡Tarea ingresada con éxito!");
                                    console.log(
                                        `Total de tareas: ${gestor.obtenerTodas().length}\n`
                                    );
                                    menu();
                                }
                            );
                        }

                        pedirDificultad();
                    }
                );
            }

            pedirFecha();
        });
    });
}

function verTareasMenu(): void {
    const tareas = gestor.obtenerTodas();

    if (tareas.length === 0) {
        console.log("\nAún no hay tareas registradas.\n");
        return menu();
    }

    console.log("\n¿Qué tareas deseas ver?:\n");
    console.log("[1] Ver todas las tareas");
    console.log("[2] Ver tareas pendientes");
    console.log("[3] Ver tareas en proceso");
    console.log("[4] Ver tareas terminadas");
    console.log("[5] Ver tareas canceladas");
    console.log("[0] Volver al menú principal\n");

    rl.question("Ingrese una opción: ", (resOpcion) => {
        const opcion = resOpcion.trim();
        let filtradas: Tarea[];

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
                console.log("Opción inválida.\n");
                return verTareasMenu();
        }

        console.log("\n--- Tareas Encontradas ---");

        if (filtradas.length === 0) {
            console.log("No hay tareas con ese estado.\n");
            return verTareasMenu();
        }

        filtradas.forEach((tarea) => {
            console.log(`[ID: ${tarea.id}] ${tarea.titulo}`);
        });

        console.log("\n[0] Volver\n");
        verDetalleId(filtradas);
    });
}

function verDetalleId(filtradas: Tarea[]): void {
    rl.question("Ingrese el id de la tarea que desea ver:\n", (resId) => {
        const idBuscado = resId.trim();
        const tarea = filtradas.find((t) => String(t.id) === idBuscado);

        if (!tarea) {
            if (idBuscado === "0") {
                return verTareasMenu();
            }

            console.log("No se ha encontrado una tarea con ese id.\n");
            return verDetalleId(filtradas);
        }

        console.log(`\nID: ${tarea.id}`);
        console.log(`Título: ${tarea.titulo}`);
        console.log(
            `Descripción: ${tarea.descripcion || "Sin descripción"}`
        );
        console.log(`Estado: ${tarea.estado}`);
        console.log(`Dificultad: ${tarea.dificultad}`);
        console.log(
            `Fecha de vencimiento: ${
                tarea.fechaVencimiento || "Sin fecha"
            }`
        );
        console.log("\n=================\n");
        console.log("¿Qué desea hacer?");
        console.log("[0] Volver");
        console.log("[1] Editar tarea");
        console.log("[2] Eliminar tarea");

        rl.question("Ingrese una opción: ", (resOpc) => {
            switch (resOpc.trim()) {
                case "0":
                    return verTareasMenu();
                case "1":
                    return editarTarea(tarea);
                case "2":
                    console.log("Eliminar tarea todavía no está implementado.\n");
                    return verDetalleId(filtradas);
                default:
                    console.log("Opción incorrecta.\n");
                    return verDetalleId(filtradas);
            }
        });
    });
}

function editarTarea(tarea: Tarea): void {
    rl.question("Nuevo título (Enter para dejarlo igual):\n", (nuevoTitulo) => {
        if (nuevoTitulo.trim() !== "") {
            if (nuevoTitulo.trim().length < 5) {
                console.log("Título inválido. Debe tener al menos 5 caracteres.\n");
                return editarTarea(tarea);
            }
            tarea.titulo = nuevoTitulo.trim();
        }

        rl.question(
            "Nueva descripción (Enter para dejarla igual):\n",
            (nuevaDescripcion) => {
                if (nuevaDescripcion.trim() !== "") {
                    tarea.descripcion = nuevaDescripcion.trim();
                }

                rl.question(
                    "Nueva fecha de vencimiento (AAAA/MM/DD, Enter para dejarla igual):\n",
                    (nuevaFecha) => {
                        const fecha = nuevaFecha.trim();

                        if (fecha !== "" && !validarFecha(fecha)) {
                            console.log("Fecha inválida.\n");
                            return editarTarea(tarea);
                        }

                        if (fecha !== "") {
                            tarea.fechaVencimiento = fecha;
                        }

                        rl.question(
                            "Nueva dificultad: [1] Fácil [2] Media [3] Difícil (Enter para dejarla igual):\n",
                            (nuevaDificultad) => {
                                const dificultad = nuevaDificultad.trim();

                                if (dificultad !== "") {
                                    const opcion = Number(dificultad);
                                    if (![1, 2, 3].includes(opcion)) {
                                        console.log("Opción inválida.\n");
                                        return editarTarea(tarea);
                                    }

                                    tarea.dificultad = opcion === 1
                                        ? "Fácil"
                                        : opcion === 2
                                          ? "Media"
                                          : "Difícil";
                                }

                                rl.question(
                                    "Nuevo estado: [1] Pendiente [2] En proceso [3] Terminada [4] Cancelada (Enter para dejarlo igual):\n",
                                    (nuevoEstado) => {
                                        const estado = nuevoEstado.trim();

                                        if (estado !== "") {
                                            const opcion = Number(estado);
                                            if (![1, 2, 3, 4].includes(opcion)) {
                                                console.log("Opción inválida.\n");
                                                return editarTarea(tarea);
                                            }

                                            const estados: Estado[] = [
                                                "Pendiente",
                                                "En proceso",
                                                "Terminada",
                                                "Cancelada",
                                            ];
                                            tarea.estado = estados[opcion - 1];
                                        }

                                        console.log("\nTarea guardada con éxito.\n");
                                        menu();
                                    }
                                );
                            }
                        );
                    }
                );
            }
        );
    });
}

function buscarTarea(): void {
    rl.question(
        "Ingrese un título o palabra clave de la tarea que desea buscar:\n",
        (busqueda) => {
            const palabraBuscada = busqueda.trim().toLowerCase();
            const encontradas = gestor.obtenerTodas().filter((tarea) =>
                tarea.titulo.toLowerCase().includes(palabraBuscada)
            );

            if (encontradas.length === 0) {
                console.log("No se ha encontrado ninguna tarea que coincida.\n");
                console.log("[0] Volver");
                console.log("[1] Buscar otro título");

                return rl.question("¿Qué desea hacer?\n", (opcion) => {
                    if (opcion.trim() === "1") {
                        return buscarTarea();
                    }
                    return menu();
                });
            }

            console.log("\n--- Tareas encontradas ---\n");
            encontradas.forEach((tarea) => {
                console.log(`[ID: ${tarea.id}] ${tarea.titulo}`);
            });
            console.log("\n[0] Volver\n");
            verDetalleId(encontradas);
        }
    );
}

function menu(): void {
    console.log("===================");
    console.log("Gestor de Tareas");
    console.log("===================");
    console.log("[1] Agregar tarea");
    console.log("[2] Ver tareas");
    console.log("[3] Buscar tareas");
    console.log("[0] Salir");

    rl.question("\nIngrese una opción: ", (respuesta) => {
        switch (respuesta.trim()) {
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
                console.log("¡Hasta luego!");
                rl.close();
                break;
            default:
                console.log("Opción inválida.\n");
                menu();
        }
    });
}

menu();
