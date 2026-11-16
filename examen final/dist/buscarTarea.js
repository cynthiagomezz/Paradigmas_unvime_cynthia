import { Tarea } from "./Tarea.js";
export const buscarTarea = (tareas, titulo) => {
    if (titulo.trim() === "") {
        return [];
    }
    return tareas.filter(t => t.titulo.toLowerCase().includes(titulo.trim().toLowerCase()));
};
//# sourceMappingURL=buscarTarea.js.map