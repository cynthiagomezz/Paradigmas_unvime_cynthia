//ARCHIVO 
import fs from "node:fs/promises";

//Leer Archivo 
export const leerDatos=async ()=>{
  let datos;
  try{
    let recuperarDatos = await fs.readFile("./datos.txt","utf8");
    datos = JSON.parse(recuperarDatos);
    return datos;
  }
  catch(error){
    if(error instanceof SyntaxError){
      console.error("El archivo no tiene la sintaxis correcta");
      return [];
      //y asi con los otros 
    }
    else if(error.code=== "ENOENT"){
      await fs.writeFile("./datos.txt","[]","utf8");
      return [];
    }
    else{
      console.error("Error inesperado");
    }
  }

}

//guardarDatos
export const guardarDatosJson=async(tareas)=>{
  let datosAjson = JSON.stringify(tareas,null,2);
  try{
    await fs.writeFile("./datos.txt",datosAjson);
    console.log("¡DATOS GUARDADOS CON EXITO!");
  }
  catch(error){
    console.log("Se produjo un error. Los datos no se guardaron correctamente");
  }
}

