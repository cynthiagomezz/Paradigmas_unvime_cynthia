import * as tarea from "./Tarea.js";
import {crearTarea} from "./Tarea.js";
import {validarDescripcion,validarTitulo} from "./Tarea.js";
import {agregarTarea} from "./AgregarTarea.js";
import {validarVencimiento} from "./Tarea.js";
import {filtrarPorEstado, validarEstado, verDetalleId,buscarPorId} from "./MostrarTarea.js";
import {crearTareaEditada, reemplazarTarea} from "./EditarTarea.js";
import {buscarTarea} from "./BuscarTarea.js";
import {leerDatos, guardarDatosJson} from "./Archivos.js";
import * as readline from "node:readline";
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const preguntar = (mensaje)=>{
    return new Promise((resolve)=>{
        rl.question(mensaje, (respuesta)=>{
            resolve(respuesta);
        })
    })
}

//AGREGAR TAREA INTERACCION CON EL USUARIO

const agregarTareaMenu = async(tareas)=>{
    const fechaActual = new Date();
    let titulo =await preguntar("Ingrese un titulo: ");
    while(!validarTitulo(titulo)){
        console.log("El titulo debe tener al menos 5 caracteres y maximo 100");
        titulo = await preguntar("Titulo: \n"); 
    }
    let descripcion = await preguntar("Ingrese una descripcion: ");
    while(!validarDescripcion(descripcion)){
        console.log("La descripciondebe tener maximo 500 caracteres\n");
        descripcion = await preguntar("Descripcion: ");
    }
    let vencimiento = await preguntar("Ingrese una fecha de vencimiento: ");
    while(!validarVencimiento(vencimiento, fechaActual)){
        vencimiento = await preguntar("Ingrese una fecha valida o enter para continuar: \n");
    }
    if(vencimiento.trim() === ""){
        vencimiento = null;
    }
    const nuevaTarea = crearTarea(tareas,fechaActual,titulo,descripcion,vencimiento);
    tareas = agregarTarea(tareas,nuevaTarea);
    console.log("¡TAREA AGREGADA CON EXITO!\n");
    await guardarDatosJson(tareas);
    return tareas;
}

//MOSTRAR TAREA INTERACCION CON EL USUARIO

const mostrarTareaMenu= async(tareas)=>{
    if(tareas.length === 0){
        console.log("AUN NO HAY TAREAS PARA MOSTRAR\n");
        console.log("==============================\n");
        console.log("AGREGUE TAREAS\n");
        return tareas;
    }
    console.log("===============\n");
    console.log("¿QUE TAREA DESEA VER?\n");
    console.log("[1] Ver Todas\n");
    console.log("[2] Ver Pendientes\n");
    console.log("[3] Ver En Proceso\n");
    console.log("[4] Terminadas\n");
    console.log("[5] Canceladas\n");
    let opcMenu = await preguntar("Ingrese una opcion\n");
    while(opcMenu.trim()=== "" || !Number.isInteger(Number(opcMenu))|| Number(opcMenu)>5 || Number(opcMenu)<0){
        console.log("Ingrese una opcion valida\n");
        opcMenu = await preguntar("Ingrese una opcion\n");
    }
    opcMenu = Number(opcMenu);
    if(opcMenu === 0){
        return tareas;
    }

    if(opcMenu ===1){
        for(const tarea of tareas){
            console.log(`[${tarea.id}]: ${tarea.titulo}\n`);
        }
        return await preDetalleId(tareas);
    }

    if(opcMenu === 2){
        if(filtrarPorEstado(tareas,1).length === 0){
            console.log("NO HAY TAREAS PENDIENTES");
            return tareas;
        }
        for (const tarea of filtrarPorEstado(tareas,1)){
                     console.log(`[${tarea.id}]: ${tarea.titulo}\n`);

        }
        return await preDetalleId(tareas);
        
    }
    if(opcMenu === 3){
        if(filtrarPorEstado(tareas,2).length === 0){
            console.log("NO HAY TAREAS EN PROCESO");
            return tareas;
        }
        for (const tarea of filtrarPorEstado(tareas,2)){
                     console.log(`[${tarea.id}]: ${tarea.titulo}\n`);

        }
        return await preDetalleId(tareas);
    }
    if(opcMenu === 4){
        if(filtrarPorEstado(tareas,3).length === 0){
            console.log("NO HAY TAREAS TERMINADAS");
            return tareas;
        }
        for (const tarea of filtrarPorEstado(tareas,3)){
                     console.log(`[${tarea.id}]: ${tarea.titulo}\n`);

        }
        return await preDetalleId(tareas);
    }

    if(opcMenu === 5){
        if(filtrarPorEstado(tareas,4).length === 0){
            console.log("NO HAY TAREAS CANCELADAS");
            return tareas;
        }
        for (const tarea of filtrarPorEstado(tareas,4)){
                     console.log(`[${tarea.id}]: ${tarea.titulo}\n`);

        }
        return await preDetalleId(tareas);
    }


}


//Pre detalle id 

const preDetalleId= async(tareas,coincidencias=tareas)=>{
    console.log("[0] Volver");
        console.log("[1] Ver el detalle de una tarea");
        let opcion = await preguntar("¿Que desea hacer?: ");
        while(!Number.isInteger(Number(opcion)) || opcion.trim()=== "" || Number(opcion)<0 || Number(opcion)>1){
            console.log("Opcion invalida\n");
            opcion = await preguntar("¿Que desea hacer?: [1] Ver el detalle de una tarea o [0] para volver: ");
        }
        opcion = Number(opcion);
        if(opcion === 0){
            return tareas;
        }
        if(opcion === 1){
            let opcId = Number(await preguntar("Ingrese el id de la tarea que desea ver: "));
            let encontrada = buscarPorId(tareas,coincidencias,opcId);
            if(encontrada === undefined){
                console.log("No se encontro una tarea con ese id");
                return await preDetalleId(tareas);
                
            }
            await verDetalleId(encontrada);
            console.log("[0] Volver");
            console.log("[1] Editar tarea");
            let opc = await preguntar("¿Que desea hacer?: ");
            while(opc.trim() === "" || !Number.isInteger(Number(opc))|| Number(opc) >1 || Number(opc)<0){
                opc = await preguntar("Ingrese una opcion valida: ");
            }
            opc = Number(opc);
            if(opc === 0){
                return tareas;
            }
            if(opc ===1){
                const tareaEditada =await editarTarea(encontrada);
                const nuevaLista = reemplazarTarea(tareas,tareaEditada);
                console.log("¡TAREA EDITADA CON EXITO!");
                return nuevaLista;
            }
        }
}

//EDITAR TAREA INTERACCION CON EL USUARIO

const editarTarea = async ( encontrada)=>{
    console.log("¿QUE DESEA EDITAR?\n");
    console.log(`Titulo: ${encontrada.titulo}`);
    let nuevoTitulo = await preguntar("Ingrese un nuevo titulo o enter para dejar el titulo original: ");
    if(nuevoTitulo.trim() != ""){
        while(!validarTitulo(nuevoTitulo)){
            nuevoTitulo = await preguntar("El titulo debe tener al menos 5 caracteres y maximo 100 caracteres: ");
        }
    }
    console.log(`Descripcion: ${encontrada.descripcion}`);
    let nuevaDescripcion = await preguntar("Ingrese una nueva descripcion o enter para dejar la descripcion original");
    if(nuevaDescripcion.trim() != ""){
        while(!validarDescripcion(nuevaDescripcion)){
            nuevaDescripcion = await preguntar("La descripcion debe tener maximo 500 caracteres: ");
        }
    }
    console.log(`Estado: ${encontrada.estado}`);
    let nuevoEstado = Number(await preguntar("Ingrese un nuevo estado o enter para dejar el estado original [1] Pendiente [2] En proceso [3] Terminada [4] Cancelada: "));
    if(nuevoEstado != 0){
        while(!validarEstado(nuevoEstado)){
            nuevoEstado = Number(await preguntar("Ingrese un estado valido: [1] Pendiente [2] En Proceso [3] Terminada [4]Cancelada"));
        }
    }
    console.log(`[4] Dificultad: ${encontrada.dificultad}`);
    let nuevaDificultad = Number(await preguntar("Ingrese una nueva dificultad [1] Facil [2] Media [3] Dificil o enter para dejar la dificultad original: "));
    if(nuevaDificultad !== 0){
        while(!Number.isInteger(nuevaDificultad) || nuevaDificultad<1 || nuevaDificultad>3){
            nuevaDificultad = Number(await preguntar("Ingrese una dificultad valida o enter para dejar la dificultad original"));
        }
    }
    console.log(`[5] Fecha de vencimiento: ${encontrada.fechaVencimiento}`);
    let nuevoVencimiento = await preguntar("Ingrese una nueva fecha de vencimiento o enter para dejar la fecha de vencimiento original: ");
    if(nuevoVencimiento.trim() != ""){
        while(!validarVencimiento(nuevoVencimiento, new Date())){
            nuevoVencimiento = await preguntar("Ingrese una fecha de vencimiento valida: ");
        }
    }

    const nuevaTarea = crearTareaEditada(encontrada,nuevoTitulo,nuevaDescripcion,nuevoEstado,nuevaDificultad,nuevoVencimiento,new Date());
    return nuevaTarea;
}

//Buscar Tarea

const buscarTareaMenu= async (tareas)=>{
    if(tareas.length === 0){
        console.log("AUN NO HAY TAREAS AGREGADAS");
        return tareas;
    }
    let titulo = await preguntar("Ingrese el titulo de la tarea que desea buscar: ");
    while(titulo.trim()=== ""){
        titulo = await preguntar("El titulo no puede estar vacio. Ingrese un titulo valido: ");
    }

    let coincidencias = buscarTarea(tareas,titulo);
    while(coincidencias.length === 0 || titulo.trim() ===""){
        console.log("NO HAY TITULOS QUE COINCIDAN");
        titulo = await preguntar("Ingrese el titulo de la tarea que desea ver o 0 para volver: ");
        
        if(titulo.trim() === "0"){
            return tareas;
        }
        coincidencias = buscarTarea(tareas,titulo);
    }
    for(const t of coincidencias){
        console.log(`Id:[${t.id}] ${t.titulo}`);
    }
    const nuevaLista = await preDetalleId(coincidencias);
    return nuevaLista;
}



//FUNCION PRINCIPAL
const main = async()=>{
    let tareas = [];
    let datosRecuperados = await leerDatos("./datos.txt","utf8");
    tareas = [...datosRecuperados];
    while(true){
    console.log("===== GESTOR DE TAREAS =====");
    console.log("[1] Agregar Tarea");
    console.log("[2] Ver mis tareas");
    console.log("[3] Buscar una tarea");
    console.log("[0] Salir");
    let opcMenu = await preguntar("Ingrese una opcion:\n");
    if(!Number.isInteger(Number(opcMenu)) || opcMenu <0 ||opcMenu>3 || opcMenu.trim() === ""){
        console.log("Opcion invalida. Ingrese una opcion valida");
        continue;
    }
    opcMenu = Number(opcMenu);
    switch(opcMenu){
        case 1:
        tareas = await agregarTareaMenu(tareas);
        break;
        case 2:
        tareas=await mostrarTareaMenu(tareas);
        break;
        case 3:
        tareas= await buscarTareaMenu(tareas);
    }
    
    if(opcMenu === 0){
        rl.close();
        break;
    }
    
    }
}

main();