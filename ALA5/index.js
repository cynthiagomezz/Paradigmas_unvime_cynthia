const logic = require(`logicjs`);

const lvar = logic.lvar;
const eq = logic.eq;
const or = logic.or;
const and = logic.and;
const run = logic.run;

const heroes = lvar();
const aliados = lvar();
const enemigos = lvar();
const x = lvar();

const esAliado=(heroes,aliados) =>{ return or(
    and(eq(heroes,"Batman"),eq(aliados,"Robin") ),
    and(eq(heroes,"Iron Man"),eq(aliados,"Spiderman")),
    and(eq(heroes,"WonderWoman"), eq(aliados, "Superman"))
)}

const esEnemigo=(heroes,enemigos)=>{
    return or(
        and(eq(heroes,"Batman"),eq(enemigos, "Joker")),
        and(eq(heroes,"Spiderman"),eq(enemigos,"Green Goblin")),
        and(eq(heroes,"Superman"), eq(enemigos,"Lex Luthor"))
    );
}

const esMentor=(x,heroes)=>{
    return or(
        and(eq(x,"Batman"),eq(heroes,"Robin")),
        and(eq(x,"Iron Man"),eq(heroes,"Spiderman"))
    );
}


console.log("Es aliado de Batman:", run(esAliado("Batman",aliados),aliados));
console.log("Es enemigo de Superman:" ,run(esEnemigo("Superman",enemigos),enemigos));
console.log("El mentor de spiderman:", run(esMentor(x,"Spiderman"),x));
console.log("Los aliados son:", run(esAliado(heroes,aliados),[heroes,aliados]));