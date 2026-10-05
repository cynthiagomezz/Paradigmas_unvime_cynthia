let nuevoId = 0;

export function Tarea(titulo,descripcion,fechaDeVencimiento){
    nuevoId++
    this.id = nuevoId;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.estado = "Pendiente";
    this.dificultad = "Facil";
    this.fechaDeVencimiento = fechaDeVencimiento;
    this.fechaDeCreacion = new Date();

}

//Mostrar detalle id
Tarea.prototype.detalleId = function(){
    console.log(`Id: ${this.id}`);
    console.log(`Titulo: ${this.titulo}`);
    console.log(`Descripcion: ${this.descripcion}`);
    console.log(`Estado: ${this.estado}`);
    console.log(`Dificultad: ${this.dificultad}`);
    console.log(`Fecha de creacion: ${this.fechaDeCreacion.toISOString().slice(0, 10).replaceAll("-", "/")}`);
    console.log(`Fecha de vencimiento: ${this.fechaDeVencimiento || "Sin fecha"}`);
}
