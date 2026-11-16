import { Tarea } from "./Tarea.js";
export const filtrarPorEstado = (tareas, estado) => {
    const filtradas = tareas.filter(t => t.estado === estado);
    return filtradas;
};
export const validarEstado = (estado) => {
    return Number.isInteger(estado) && estado >= 1 && estado <= 4;
};
export const buscarPorId = (tareas, id) => {
    const encontrada = tareas.find(t => t.id === id);
    return encontrada;
};
export const verDetalleId = (encontrada) => {
    console.log("===============\n");
    console.log("DETALLE DE LA TAREA\n");
    console.log(`Id: ${encontrada.id}`);
    console.log(`Titulo: ${encontrada.titulo}`);
    console.log(`Descripcion: ${encontrada.descripcion}`);
    console.log(`Estado: ${encontrada.estado}`);
    console.log(`Dificultad: ${encontrada.dificultad}`);
    console.log(`Fecha de creacion: ${encontrada.creacion.toLocaleDateString("es-AR")}`);
    console.log(`Ultima edicion: ${encontrada.edicion.toLocaleDateString("es-AR")}`);
    if (encontrada.vencimiento === null) {
        console.log("Vencimiento: Sin vencimiento");
    }
    else if (!(encontrada.vencimiento === null)) {
        console.log(`Vencimiento: ${encontrada.vencimiento.toLocaleDateString("es-AR")}`);
    }
};
//# sourceMappingURL=mostrarTareas.js.map