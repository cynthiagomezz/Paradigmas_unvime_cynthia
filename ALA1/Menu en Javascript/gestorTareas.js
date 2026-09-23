class gestorTareas{
    constructor(){
        this.ListaTareas = [];
    }

    agregarTarea(tarea){
        this.ListaTareas.push(tarea);
    }

    obtenerTodas(){
        return this.ListaTareas;
    }

    obtenerPorEstado(estado){
        return this.ListaTareas.filter(tarea => tarea.estado.toLowerCase() === estado.toLowerCase());
    }
}

module.exports = gestorTareas ; 
