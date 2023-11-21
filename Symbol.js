// // // Criação de um variável Symbol
// // var sym1 = Symbol();
// // var sym2 = Symbol("foo");
// // var sym3 = Symbol("foo");

// // // Demonstrando a unicidade do Symbol
// // console.log(sym2 == sym3)
// // console.log(sym2 === sym3)
// // console.log(sym2 != sym3)
// // console.log(sym2 !== sym3)

// //Demonstrando como symbol não é enumerável
// const chavePrivada = Symbol("chavePrivada");
// let meuObjeto = {
//   [chavePrivada]: "Este é um valor privado",
//   valor: 11,
// };

// // for (let chave in meuObjeto) {
// //   console.log(chave); // apenas 'nome' e 'idade', não 'meuSimbolo'
// // }
// // console.log(Object.keys(meuObjeto));

// //Então como acesssar os Symbols??

// console.log(Object.getOwnPropertySymbols(meuObjeto))
// // Criando ou recuperando um símbolo global chamado "meuSimboloGlobal"
// console.log(Symbol.for("chavePrivada"));

// const mesmoSimbolo = Symbol.for("meuSimboloGlobal");

// console.log(meuSimboloGlobal === mesmoSimbolo);

// // Demonstrando contexto uteís para o Symbol

// Biblioteca simulada de internacionalização
// Biblioteca simulada
// const MinhaBiblioteca = (function () {
//     const _propriedadeEspecial = Symbol('propriedadeEspecial');

//     return {
//       criarObjetoComPropriedadeEspecial: function () {
//         const objeto = {};
//         objeto[_propriedadeEspecial] = 'Valor inicial';

//         return objeto;
//       },

//       obterPropriedadeEspecial: function (objeto) {
//         return objeto[_propriedadeEspecial];
//       }
//     };
//   })();

//   // Usando a biblioteca
//   const meuObjeto = MinhaBiblioteca.criarObjetoComPropriedadeEspecial();

//   console.log(MinhaBiblioteca.obterPropriedadeEspecial(meuObjeto)); // 'Valor inicial'

//   // Tentativa de alterar a propriedade especial diretamente
//   meuObjeto[_propriedadeEspecial] = 'Novo valor';

//   console.log(MinhaBiblioteca.obterPropriedadeEspecial(meuObjeto)); // 'Valor inicial'
