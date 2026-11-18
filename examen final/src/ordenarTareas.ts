import {Tarea} from "./Tarea.js";

export const ordenarAlfabeticamente=(tareas:Tarea[]):Tarea[]=>{
    let nuevaLista = tareas.toSorted((a,b)=> a.titulo.localeCompare(b.titulo));
    return nuevaLista;
}

export const ordenarPorVencimiento=(tareas:Tarea[]):Tarea[]=>{
    let sinVencimiento = tareas.filter(tarea=> tarea.vencimiento === null);
    let conVencimiento = tareas.filter(tarea=> tarea.vencimiento !== null).toSorted((a,b)=> a.vencimiento!.getTime() - b.vencimiento!.getTime());
    const nuevaLista = [...conVencimiento,...sinVencimiento];
    return nuevaLista;
}

export const ordenarPorCreacion=(tareas:Tarea[]):Tarea[]=>{
    const nuevaLista = tareas.toSorted((a,b)=> a.creacion.getTime() - b.creacion.getTime());
    return nuevaLista;
}