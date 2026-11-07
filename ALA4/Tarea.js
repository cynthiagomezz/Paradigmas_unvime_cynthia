
//Validaciones 
const validarFormatoFecha=(vencimiento)=>{
    const patron = /^\d{2}\/\d{2}\/\d{4}$/;
    return patron.test(vencimiento);
}

const validarFechaReal=(vencimiento)=>{
    const partes = vencimiento.split("/");
    const dia = Number(partes[0]);
    const mes = Number(partes[1]);
    const anio = Number(partes[2]);
    const fecha = new Date(anio,(mes-1), dia);

    const diaValido = fecha.getDate()=== dia;
    const mesValido = fecha.getMonth() === mes - 1;
    const anioValido = fecha.getFullYear() === anio;

    return diaValido && mesValido && anioValido;
       
}

const fechaPosterior = (vencimiento, fechaActual) =>{
    const partes = vencimiento.split("/");
    const dia = Number(partes[0]);
    const mes = Number(partes[1]);
    const anio = Number(partes[2]);

    const fecha = new Date(anio, (mes-1), dia);
    const diaActual = fechaActual.getDate();
    const mesActual = fechaActual.getMonth() ;
    const anioActual = fechaActual.getFullYear();

    const diaHoy = new Date(anioActual,mesActual,diaActual);
    return fecha >= diaHoy;
}

export const validarVencimiento= (vencimiento,fechaActual)=>{
    if(vencimiento.trim() === ""){
        return true;
    }
    if(!validarFormatoFecha(vencimiento,fechaActual)){
        return false;
    }
    if(!validarFechaReal(vencimiento)){
        return false;
    }
    if(!fechaPosterior(vencimiento,fechaActual)){
        return false;
    }
    
    return true;

}



export const validarTitulo=(titulo)=>{
    return titulo.trim().length>=5 && titulo.trim().length <=100;
}
export const validarDescripcion=(descripcion)=>{
    return descripcion.length<= 500;
}
const ultimoId=(tareas)=>{
    if(tareas.length===0){
        return 1;
    }
    const ids = tareas.map(t => t.id);
    const elMayor = Math.max(...ids) +1;
    return elMayor;
}

export const recibirFecha=()=>{
    const fecha = new Date();
    return fecha;
}

export const crearTarea = (tareas,recibirFecha,titulo,descripcion, fechaVencimiento) =>{
    
        const tarea = {
        id: ultimoId(tareas),
        titulo,
        descripcion,
        estado: 1,
        fechaVencimiento,
        creacion: recibirFecha,
        edicion:recibirFecha,
        dificultad:1,
    }
    return Object.freeze(tarea);
}