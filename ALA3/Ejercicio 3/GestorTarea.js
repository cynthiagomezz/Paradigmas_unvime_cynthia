import * as readline from 'readline'; 

export function GestorTarea(listaTareas){
    this.listaTareas = listaTareas;
} 

//agregar Tarea
GestorTarea.prototype.agregarTarea = function(tarea){
    this.listaTareas.push(tarea);
}
//mostrar Tarea

GestorTarea.prototype.obtenerTodasTareas= function(){
    return this.listaTareas;
}

GestorTarea.prototype.obtenerPorEstado = function(opcEstado){
    return this.listaTareas.filter((tarea) => tarea.estado.toLowerCase() === opcEstado.toLowerCase());
}

//buscar Tarea

    GestorTarea.prototype.buscarTarea = function(opcTitulo){
    const encontradas = [];

    if(this.listaTareas.length < 1){
        console.log("Aun no hay tareas agregadas\n");
        return encontradas;
    }

    for(const tarea of this.listaTareas){

        if(tarea.titulo.toLowerCase().includes(opcTitulo.toLowerCase())){
            encontradas.push(tarea);
        }
    }

        return encontradas;
}


