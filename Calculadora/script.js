const pantalla = document.getElementById('pantalla');

const botones = document.querySelectorAll(".boton");

botones.forEach(boton =>{
  boton.addEventListener('click',() =>{
    
    if(boton.id === "limpiar"){
      pantalla.value = '';
    } else if (boton.id === "borrar"){
      pantalla.value = pantalla.value.slice(0,-1);

    } else if (boton.id === "igual"){
      try{
        pantalla.value = eval(pantalla.value);

      }
      catch(error) {
        pantalla.value = 'error';
      }
    }
     else {
      pantalla.value += boton.value;
    }
  })
})
