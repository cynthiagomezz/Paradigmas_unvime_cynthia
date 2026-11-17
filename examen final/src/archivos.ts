//ARCHIVO 
import fs from "node:fs/promises";
import {Tarea} from "./Tarea.js";
//Leer Archivo 
export const leerDatos=async ():Promise <Tarea[]>=> {
  let datos: Tarea[];
  try{
    let recuperarDatos = await fs.readFile("./datos.txt","utf8");
    datos = JSON.parse(recuperarDatos);
    let fechasCorregidas = datos.map(d=>({
      ...d,
      creacion: new Date(d.creacion),
      edicion: new Date(d.edicion)
    }));
    return fechasCorregidas;
  }
  catch(error){
    if(error instanceof Error && "code" in error){
      if(error.code === "ENOENT"){
        console.error("No se encontro el archivo");
        return [];
      }
      else{
      console.error("error.message");
      return[];
      //y asi con los otros 
      }
    }
  }

}

//guardarDatos
export const guardarDatosJson=async(tareas:Tarea[])=>{
  let datosAjson = JSON.stringify(tareas,null,2);
  try{
    await fs.writeFile("./datos.txt",datosAjson);
    console.log("¡DATOS GUARDADOS CON EXITO!");
  }
  catch(error){
    console.log("Se produjo un error. Los datos no se guardaron correctamente");
  }
}

