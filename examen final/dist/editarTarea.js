import { validarTitulo, validarDescripcion, validarVencimiento, Tarea } from "./Tarea.js";
import { validarEstado } from "./mostrarTareas.js";
export const crearTareaEditada = (encontrada, nuevoTitulo, nuevaDescripcion, nuevoEstado, nuevaDificultad, nuevoVencimiento, fechaActual) => {
    let fecha = null;
    if (nuevoVencimiento === "null") {
        fecha = null;
    }
    if (nuevoVencimiento.trim() !== "") {
        const partes = nuevoVencimiento.split("/");
        const dia = Number(partes[0]);
        const mes = Number(partes[1]);
        const anio = Number(partes[2]);
        fecha = new Date(anio, (mes - 1), dia);
    }
    const nuevaTarea = {
        ...encontrada,
        titulo: nuevoTitulo.trim() !== "" ? nuevoTitulo : encontrada.titulo,
        descripcion: nuevaDescripcion.trim() !== "" ? nuevaDescripcion : encontrada.descripcion,
        estado: nuevoEstado !== 0 ? nuevoEstado : encontrada.estado,
        dificultad: nuevaDificultad !== 0 ? nuevaDificultad : encontrada.dificultad,
        vencimiento: nuevoVencimiento.trim() !== "" ? fecha : encontrada.vencimiento,
        edicion: fechaActual,
    };
    return Object.freeze(nuevaTarea);
};
export const reemplazarTarea = (tareas, nuevaTarea) => {
    return tareas.map(tarea => tarea.id === nuevaTarea.id ? nuevaTarea : tarea);
};
//# sourceMappingURL=editarTarea.js.map