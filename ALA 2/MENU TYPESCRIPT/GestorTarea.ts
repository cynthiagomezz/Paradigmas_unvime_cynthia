import Tarea, { Estado } from "./Tarea";

class GestorTarea {
    private listaTareas: Tarea[];

    constructor() {
        this.listaTareas = [];
    }

    agregarTarea(tarea: Tarea): void {
        this.listaTareas.push(tarea);
    }

    obtenerTodas(): Tarea[] {
        return this.listaTareas;
    }

    obtenerPorEstado(estado: Estado): Tarea[] {
        return this.listaTareas.filter(
            (tarea) => tarea.estado.toLowerCase() === estado.toLowerCase()
        );
    }
}

export default GestorTarea;
