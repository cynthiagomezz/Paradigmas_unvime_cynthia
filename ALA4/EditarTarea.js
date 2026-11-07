import {validarTitulo,validarDescripcion,validarVencimiento} from "./Tarea.js";
import {validarEstado} from "./MostrarTarea.js";

export const crearTareaEditada = (encontrada,nuevoTitulo,nuevaDescripcion,nuevoEstado,nuevaDificultad,nuevoVencimiento,fechaActual)=>{
    const nuevaTarea = {
        ...encontrada,
        titulo: nuevoTitulo.trim() !== "" ? nuevoTitulo : encontrada.titulo,
        descripcion: nuevaDescripcion.trim() !== "" ? nuevaDescripcion: encontrada.descripcion,
        estado: nuevoEstado !== 0 ? nuevoEstado : encontrada.estado,
        dificultad: nuevaDificultad !== 0 ? nuevaDificultad: encontrada.dificultad,
        fechaVencimiento: nuevoVencimiento.trim() !== "" ? nuevoVencimiento: encontrada.fechaVencimiento,
        edicion: fechaActual,
    }
    return Object.freeze(nuevaTarea);
}
export const reemplazarTarea=(tareas, nuevaTarea)=>{
    return tareas.map(tarea => tarea.id === nuevaTarea.id ? nuevaTarea : tarea);
} 