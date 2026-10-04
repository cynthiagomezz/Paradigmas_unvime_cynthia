import { Calculadora } from "./Calculadora";
import * as readline from 'readline';
 function main(): void{
    const rl : readline.Interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    }) 
    const calculadora = new Calculadora();
    
    //Pedir datos 
    
    function pedirOperacion():void{
        let opcionElegida:string;
        rl.question("¿Que operacion desea realizar? [0] salir [1] sumar [2] restar [3] multiplicar [4] dividir",(operacion) =>{
        switch(operacion){
            case "0":
            return ;
            case "1":
                opcionElegida = "sumar";
                break;
            case "2":
                opcionElegida ="restar";
                break;
            case "3":
            opcionElegida ="multiplicar";
            break;
            case "4":
            opcionElegida ="dividir";
            break;
            default:
                console.log("opcion invalida"); return;
        }
        
        rl.question("Ingrese el primer numero", (numero01) =>{
            const numero1: number = Number(numero01);
            if(Number.isNaN(numero1)){
                console.log("Ingrese un numero valido:\n");
                return;
            }
            //aca quiero validar que sea un nuero pero o se como
            rl.question("Ingrese el segundo numero", (numero02)=>{
                const numero2:number = Number(numero02);
                if(Number.isNaN(numero2)){
                    console.log("Ingrese un numero valido: \n");
                    return;
                }
                //Creo que estoy inventando funciones
                
                if(opcionElegida === "sumar"){
                    console.log(calculadora.sumar(numero1,numero2));
                }
                else if(opcionElegida ==="restar"){
                    console.log(calculadora.restar(numero1, numero2));
                }
                else if(opcionElegida ==="multiplicar"){
                    console.log(calculadora.multiplicar(numero1, numero2));
                        
                    }
                else if(opcionElegida === "dividir"){
                    if(numero2 === 0){
                        console.log("No se puede dividir por cero \n");
                    }
                    else{
                        console.log(calculadora.dividir(numero1,numero2));
                    }
                }

            }); 

        }); 

        

    }); 

    } 
pedirOperacion();
 } 

main();
