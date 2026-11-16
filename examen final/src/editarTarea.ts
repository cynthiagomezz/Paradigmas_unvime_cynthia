import {validarTitulo,validarDescripcion,validarVencimiento,Tarea,type Estado,type Dificultad} from "./Tarea.js";
import {validarEstado} from "./mostrarTareas.js";

export const crearTareaEditada = (encontrada:Tarea,nuevoTitulo:string,nuevaDescripcion:string ,
nuevoEstado:Estado | 0,nuevaDificultad:Dificultad|0,
nuevoVencimiento:string,fechaActual:Date):Tarea=>{
    let fecha:Date | null = null;
    if(nuevoVencimiento === "null"){
        fecha= null;
    }
    if(nuevoVencimiento.trim() !== ""){
    const partes = nuevoVencimiento.split("/");
    const dia = Number(partes[0]);
    const mes = Number(partes[1]);
    const anio = Number(partes[2]);
    fecha = new Date(anio,(mes-1), dia);}
    
    
    const nuevaTarea = {
        ...encontrada,
        titulo: nuevoTitulo.trim() !== "" ? nuevoTitulo : encontrada.titulo,
        descripcion: nuevaDescripcion.trim() !== "" ? nuevaDescripcion: encontrada.descripcion,
        estado: nuevoEstado !== 0 ? nuevoEstado : encontrada.estado,
        dificultad: nuevaDificultad !== 0 ? nuevaDificultad: encontrada.dificultad,
        vencimiento: nuevoVencimiento.trim() !== "" ? fecha: encontrada.vencimiento,
        edicion: fechaActual,
    }
    return Object.freeze(nuevaTarea);
}
export const reemplazarTarea=(tareas:Tarea[], nuevaTarea:Tarea):Tarea[]=>{
    return tareas.map(tarea => tarea.id === nuevaTarea.id ? nuevaTarea : tarea);
} 