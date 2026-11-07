
export const filtrarPorEstado=(tareas, estado) =>{
    const filtradas = tareas.filter(t => t.estado === estado);
    return filtradas;
}

export const validarEstado =(estado)=>{
    return Number.isInteger(estado) && estado>=1 && estado <= 4;
}

/*Mostrar detalle id ej [0] Hola [1] Estudiar
[0] Volver 
[1] Ver detalle id => ingrese el id <= eso en main
la funcion detalle id recibe el id verDetalleId(tareas (hay
que fijarse si esta filtradas por estado para simplificar la 
busqueda,id )+ find(tarea => tarea.id === id)))
 validar que el id exista si no existe mostrar msj 
 y return .
 si existe mostramos toda la informacion de la tarea 
 [0] volver 
 */
export const buscarPorId = (tareas,coincidencias, id)=>{
    const encontrada= tareas.find(t => t.id === id);
    return encontrada;
}

export const verDetalleId= ( encontrada) =>{
    

    console.log("===============\n");
    console.log("DETALLE DE LA TAREA\n");
    console.log(`Id: ${encontrada.id}`);
    console.log(`Titulo: ${encontrada.titulo}`);
    console.log(`Descripcion: ${encontrada.descripcion}`);
    console.log(`Estado: ${encontrada.estado}`);
    console.log(`Dificultad: ${encontrada.dificultad}`);
    console.log(`Fecha de creacion: ${encontrada.creacion.toLocaleDateString("es-AR")}`);
    console.log(`Ultima edicion: ${encontrada.edicion.toLocaleDateString("es-AR")}`);
    if(encontrada.fechaVencimiento === null){
        console.log("Vencimiento: Sin vencimiento");
    }
    else if(!(encontrada.fechaVencimiento === null)){
        console.log(`Vencimiento: ${encontrada.fechaVencimiento}`);
    }
}