import { Tarea, type Estado, type Dificultad } from "./Tarea.js";
export declare const crearTareaEditada: (encontrada: Tarea, nuevoTitulo: string, nuevaDescripcion: string, nuevoEstado: Estado | 0, nuevaDificultad: Dificultad | 0, nuevoVencimiento: string, fechaActual: Date) => Tarea;
export declare const reemplazarTarea: (tareas: Tarea[], nuevaTarea: Tarea) => Tarea[];
//# sourceMappingURL=editarTarea.d.ts.map