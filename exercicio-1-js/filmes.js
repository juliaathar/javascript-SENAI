// const filme = {
//     titulo : 'Vingadores',
//     dataLancamento: 2022-02-12,
//     sinopse : 'Filme de ação da Marvel',
//     genero : 'Ação'
// }


// const {titulo, sinopse, genero} = filme

// console.log(`
// Filme: 

// Título: ${titulo}
// Sinopse: ${sinopse}
// Genero: ${genero}

// `);

const filmes = [
    {
        titulo : 'Vingadores',
        dataLancamento: 2022-02-12,
        sinopse : 'Filme de ação da Marvel',
        genero : 'Ação'
    },
    {
        titulo : 'X-men',
        dataLancamento: 2022-02-12,
        sinopse : 'Filme de aventura',
        genero : 'Aventura'
    },
    {
        titulo : 'Velozes e furiosos',
        dataLancamento: 2022-02-12,
        sinopse : 'Filme de corrida',
        genero : 'Ação'
    }
]


filmes.forEach((filme) => {
    
    const {titulo, sinopse, genero} = filme
    
    console.log(`
    Filme: 
    
    Título: ${titulo}
    Sinopse: ${sinopse}
    Genero: ${genero}
    
    `);
});
