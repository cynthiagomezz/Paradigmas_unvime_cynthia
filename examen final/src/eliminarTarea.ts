import {Tarea} from "./Tarea.js";
export const eliminarTarea = (tareas:Tarea[],encontrada:Tarea):Tarea[]=>{
    let nuevaLista= tareas.filter(tarea=> tarea.id !== encontrada.id);
    return nuevaLista;
}