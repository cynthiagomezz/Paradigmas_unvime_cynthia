export declare const validarFormatoFecha: (vencimiento: string) => boolean;
export declare const validarFechaReal: (vencimiento: string) => boolean;
export declare const validarVencimiento: (vencimiento: string, fechaActual: Date) => boolean;
export declare const validarTitulo: (titulo: string) => boolean;
export declare const validarDescripcion: (descripcion: string) => boolean;
export declare const recibirFecha: () => Date;
export type Estado = 1 | 2 | 3 | 4;
export type Dificultad = 1 | 2 | 3;
export declare class Tarea {
    id: number;
    titulo: string;
    descripcion: string;
    estado: Estado;
    vencimiento: Date | null;
    creacion: Date;
    edicion: Date;
    dificultad: Dificultad;
    constructor(tareas: Tarea[], titulo: string, descripcion: string, vencimiento: Date | null);
}
//# sourceMappingURL=Tarea.d.ts.map