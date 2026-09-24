let ultimoId = 0;

export type Dificultad = "Fácil" | "Media" | "Difícil";
export type Estado = "Pendiente" | "En proceso" | "Terminada" | "Cancelada";

export default class Tarea {
    id: number;
    titulo: string;
    descripcion: string;
    dificultad: Dificultad;
    estado: Estado;
    fechaCreacion: Date;
    fechaVencimiento: string;

    constructor(
        titulo: string,
        descripcion: string,
        fechaVencimiento: string,
        dificultad: Dificultad
    ) {
        ultimoId++;
        this.id = ultimoId;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.dificultad = dificultad;
        this.estado = "Pendiente";
        this.fechaCreacion = new Date();
        this.fechaVencimiento = fechaVencimiento;
    }
}
