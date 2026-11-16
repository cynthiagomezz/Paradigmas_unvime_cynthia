import {Tarea} from "./Tarea.js";
 
 export const agregarTarea = (tareas:Tarea[],nuevaTarea:Tarea):Tarea[] =>{
    const nuevaLista = [...tareas,nuevaTarea];
    return nuevaLista;
 }
