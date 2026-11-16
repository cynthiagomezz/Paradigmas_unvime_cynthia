import {agregarTarea} from "./agregarTarea.js";

//VALIDAR VENCIMIENTO 
export const validarFormatoFecha=(vencimiento:string):boolean=>{
    const patron = /^\d{2}\/\d{2}\/\d{4}$/;
    return patron.test(vencimiento);
}

export const validarFechaReal=(vencimiento:string):boolean=>{
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

const fechaPosterior = (vencimiento:string, fechaActual:Date):boolean =>{
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

export const validarVencimiento= (vencimiento:string,fechaActual:Date):boolean=>{
    if(vencimiento.trim() === ""){
        return true;
    }
    if(!validarFormatoFecha(vencimiento)){
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

//OTRAS VALIDACIONES

export const validarTitulo=(titulo:string):boolean=>{
    return titulo.trim().length>=5 && titulo.trim().length <=100;
}
export const validarDescripcion=(descripcion:string):boolean=>{
    return descripcion.length<= 500;
}
const ultimoId=(tareas:Tarea[]):number=>{
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


//CREAR TAREA
export type Estado = 1 | 2 | 3| 4;
export type Dificultad = 1 | 2 | 3;
export class Tarea{
    id: number;
    titulo: string;
    descripcion: string;
    estado: Estado = 1 ;
    vencimiento: Date | null;
    creacion: Date;
    edicion: Date;
    dificultad: Dificultad=1;

    constructor(tareas:Tarea[],titulo:string,descripcion:string,vencimiento:Date|null){
        this.id = ultimoId(tareas);
        this.titulo = titulo;
        this.descripcion=descripcion;
        this.vencimiento = vencimiento;
        this.creacion= recibirFecha();
        this.edicion= recibirFecha();

    }
}