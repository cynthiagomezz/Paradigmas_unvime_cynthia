import {Tarea} from "./Tarea.js";
export const buscarTarea=(tareas:Tarea[],titulo:string):Tarea[]=>{
    if(titulo.trim()=== ""){
        return [];
    }
    return tareas.filter(t=> t.titulo.toLowerCase().includes(titulo.trim().toLowerCase()));

}