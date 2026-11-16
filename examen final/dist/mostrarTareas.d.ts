import { Tarea, type Estado } from "./Tarea.js";
export declare const filtrarPorEstado: (tareas: Tarea[], estado: Estado) => Tarea[];
export declare const validarEstado: (estado: Estado | 0) => boolean;
export declare const buscarPorId: (tareas: Tarea[], id: number) => Tarea | undefined;
export declare const verDetalleId: (encontrada: Tarea) => void;
//# sourceMappingURL=mostrarTareas.d.ts.map