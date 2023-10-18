const camisaLacoste = {
    descricao: 'Camisa Polo',
    preco: 589.97,
    tamanho: 'M',
    cor: 'Amarela',
    presente: true
}

//método cnvencional

// const descricao = camisaLacoste.descricao;
// const preco = camisaLacoste.preco;

// console.log('Produto:');
// console.log();

// console.log(`Descrição: ${descricao}`);
// console.log(`Preço: ${preco}`);


//destructuring

const {descricao, preco} = camisaLacoste;
const {presente} = camisaLacoste;

console.log(`
Produto:
   Descrição: ${descricao}
   Preço: ${preco}
   Presente: ${presente? 'sim' : 'não'}
`);



//exercicio

//criar uma desestruturação para um objeto filmes
//trazer somente 3 propriedades
//criar um arquivo a parte e tente executar sme consulta