//  const numeros = [1, 2, 5, 10, 300];

// const arrDobro = numeros.map((n) => {
//     return n * 2;
// });

// console.log(numeros);

// console.log(arrDobro);

//crie 2 arrays nomes e sobrenomes
//cire um terceiro array de nomesCompleto
//ao final exiba os nomes completos no console com o foreach 
//é necessário contem pelo menos 5 nomes
// utilize arrow function como callback functions


const nomes = ['Júlia', 'Paulo', 'Enzo', 'Lucas', 'Richard']

const sobrenomes = ['Aben-Athar', 'Gonçalves', 'Quarelo', 'Oliveira', 'Passarelli']

// const nomesCompleto = ['Júlia Aben-Athar', 'Paulo Gonçalves', 'Enzo Quarelo', 'Lucas Oliveira', 'Richard Passarelli']

// nomesCompleto.forEach( (nomes) => {
//     console.log(nomes);
// });

const nomesCompletos = nomes.map((nome, index) =>{
    return `${nome} ${sobrenomes[index]}`
})

nomesCompletos.forEach((nc) => {
    console.log(nc);
})