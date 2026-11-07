export const buscarTarea=(tareas,titulo)=>{
    return tareas.filter(t=> t.titulo.includes(titulo));

}