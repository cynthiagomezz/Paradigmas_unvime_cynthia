//clase tarea
let ultimoId = 0;
class Tarea{
    constructor(titulo, descripcion, fechaVencimiento,dificultad){
        ultimoId++;
        this.id = ultimoId;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.estado = "pendiente";
        this.fechaCreacion = new Date();
        this.fechaVencimiento = fechaVencimiento;
        this.dificultad = dificultad;
    }
}

module.exports = Tarea;
