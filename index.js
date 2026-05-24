// Importa o módulo "readline" do Node.js.
// "require" carrega um módulo para podermos usar seus recursos no programa.
const readline = require("readline");

// Cria uma interface de leitura/escrita no terminal.
// readline.createInterface(...) configura como o programa vai receber e mostrar dados.
const rl = readline.createInterface({
  // process.stdin representa a entrada padrão do programa,
  // ou seja, o que o usuário digita no teclado no terminal.
  input: process.stdin,

  // process.stdout representa a saída padrão,
  // ou seja, onde o programa escreve mensagens no terminal.
  output: process.stdout
});

// Cria um array vazio chamado "herois".
// Esse array vai armazenar todos os heróis cadastrados no programa.
let herois = [];

// Cria a variável "proximoId" começando com 1.
// Ela será usada para gerar IDs únicos para cada herói.
let proximoId = 1;

// Declara a função "calcularNivel".
// "function" serve para criar uma função.
// "xp" é o parâmetro que a função recebe.
function calcularNivel(xp) {

  // "if" verifica uma condição.
  // Se xp for menor ou igual a 1000...
  if (xp <= 1000) {

    // "return" devolve um valor e encerra a função naquele ponto.
    return "Ferro";

  // "else if" quer dizer: se a condição anterior não foi atendida,
  // então teste esta nova condição.
  } else if (xp <= 2000) {
    return "Bronze";

  // Se não for até 2000, verifica se é até 5000.
  } else if (xp <= 5000) {
    return "Prata";

  // Se não for até 5000, verifica se é até 7000.
  } else if (xp <= 7000) {
    return "Ouro";

  // Se não for até 7000, verifica se é até 8000.
  } else if (xp <= 8000) {
    return "Platina";

  // Se não for até 8000, verifica se é até 9000.
  } else if (xp <= 9000) {
    return "Ascendente";

  // Se não for até 9000, verifica se é até 10000.
  } else if (xp <= 10000) {
    return "Imortal";

  // "else" pega qualquer outro caso que não entrou nas condições acima.
  } else {
    return "Radiante";
  }
}

// Declara a função "mostrarMenu".
// Essa função é a principal do sistema, porque ela mostra as opções do programa.
function mostrarMenu() {

  // console.log mostra mensagens no terminal.
  // "\n" significa quebra de linha.
  console.log("\n=== MENU DE HERÓIS ===");

  // Mostra a opção 1.
  console.log("1 - Cadastrar herói");

  // Mostra a opção 2.
  console.log("2 - Consultar heróis");

  // Mostra a opção 3.
  console.log("3 - Editar herói");

  // Mostra a opção 4.
  console.log("4 - Sair");

  // rl.question faz uma pergunta no terminal.
  // O primeiro argumento é o texto da pergunta.
  // O segundo argumento é uma função callback, que executa quando o usuário responde.
  rl.question("Escolha uma opção: ", function(opcao) {

    // "switch" é usado quando queremos comparar uma variável
    // com vários valores possíveis de forma organizada.
    switch (opcao) {

      // Se a opção digitada for "1"...
      case "1":

        // Chama a função de cadastro.
        cadastrarHeroi();

        // "break" interrompe o case atual do switch.
        // Sem ele, o switch continuaria executando os próximos cases.
        break;

      // Se a opção digitada for "2"...
      case "2":
        consultarHerois();
        break;

      // Se a opção digitada for "3"...
      case "3":
        editarHeroi();
        break;

      // Se a opção digitada for "4"...
      case "4":

        // Exibe mensagem de encerramento.
        console.log("Encerrando programa...");

        // Fecha a interface readline.
        // Isso encerra a leitura do terminal e finaliza o programa.
        rl.close();
        break;

      // "default" é executado quando nenhum case bate com o valor informado.
      default:
        console.log("Opção inválida!");

        // Chama o menu novamente para o usuário tentar outra opção.
        mostrarMenu();
    }
  });
}

// Declara a função para cadastrar um novo herói.
function cadastrarHeroi() {

  // Pergunta o nome do herói.
  rl.question("Digite o nome do herói: ", function(nome) {

    // Depois de receber o nome, pergunta o XP.
    rl.question("Digite a quantidade de XP: ", function(xpInformado) {

      // parseInt converte o texto digitado para um número inteiro.
      // Exemplo: "5000" vira 5000.
      let xp = parseInt(xpInformado);

      // isNaN(xp) verifica se o valor não é um número válido.
      // "||" significa OU.
      // Então a condição diz:
      // se não for número OU se for menor que 0.
      if (isNaN(xp) || xp < 0) {
        console.log("XP inválido!");

        // "return" aqui faz a função parar e já voltar para o menu.
        return mostrarMenu();
      }

      // Chama a função calcularNivel e guarda o resultado em "nivel".
      let nivel = calcularNivel(xp);

      // Cria um objeto chamado "heroi".
      // Objeto é uma estrutura com propriedades.
      let heroi = {

        // id recebe o valor atual de proximoId.
        // O operador ++ incrementa o valor depois de usar.
        // Exemplo: primeiro usa 1, depois proximoId passa a ser 2.
        id: proximoId++,

        // nome recebe o valor digitado pelo usuário.
        nome: nome,

        // xp recebe o número convertido com parseInt.
        xp: xp,

        // nivel recebe o resultado da função calcularNivel.
        nivel: nivel
      };

      // push adiciona o objeto "heroi" no final do array "herois".
      herois.push(heroi);

      // Isso é uma template string.
      // Ela usa crase (` `) em vez de aspas.
      // ${heroi.nome} insere o valor da variável dentro do texto.
      console.log(`O Herói de nome ${heroi.nome} foi cadastrado com sucesso!`);

      // Mostra o nível do herói cadastrado.
      console.log(`Ele está no nível de ${heroi.nivel}`);

      // Depois do cadastro, volta ao menu principal.
      mostrarMenu();
    });
  });
}

// Declara a função para consultar/listar os heróis cadastrados.
function consultarHerois() {

  // length mostra a quantidade de itens do array.
  // Se for igual a 0, significa que está vazio.
  if (herois.length === 0) {
    console.log("Nenhum herói cadastrado.");
  } else {

    // Se houver heróis, mostra o título da listagem.
    console.log("\n=== HERÓIS CADASTRADOS ===");

    // forEach percorre cada elemento do array.
    // Para cada item, executa a função callback.
    herois.forEach(function(heroi) {

      // Mostra os dados do herói atual.
      // ${...} insere cada propriedade do objeto dentro da string.
      console.log(
        `ID: ${heroi.id} | Nome: ${heroi.nome} | XP: ${heroi.xp} | Nível: ${heroi.nivel}`
      );
    });
  }

  // Depois de consultar, volta ao menu.
  mostrarMenu();
}

// Declara a função de edição de herói.
function editarHeroi() {

  // Se não houver heróis cadastrados, não há o que editar.
  if (herois.length === 0) {
    console.log("Nenhum herói cadastrado para editar.");

    // Volta ao menu e encerra a função.
    return mostrarMenu();
  }

  // Mostra os heróis cadastrados antes de pedir o ID.
  consultarHeroisSemVoltar();

  // Pergunta qual ID o usuário deseja editar.
  rl.question("Digite o ID do herói que deseja editar: ", function(idInformado) {

    // Converte o ID digitado para número inteiro.
    let id = parseInt(idInformado);

    // findIndex procura no array o índice do primeiro item
    // que satisfaça a condição informada.
    // Se encontrar, retorna a posição.
    // Se não encontrar, retorna -1.
    let indice = herois.findIndex(function(heroi) {

      // "===" compara valor e tipo ao mesmo tempo.
      // Aqui ele verifica se o id do herói é igual ao id digitado.
      return heroi.id === id;
    });

    // Se o índice for -1, quer dizer que o herói não foi encontrado.
    if (indice === -1) {
      console.log("Herói não encontrado.");
      return mostrarMenu();
    }

    // Pergunta o novo nome.
    rl.question("Novo nome do herói: ", function(novoNome) {

      // Pergunta o novo XP.
      rl.question("Novo XP do herói: ", function(novoXpInformado) {

        // Converte o novo XP para número inteiro.
        let novoXp = parseInt(novoXpInformado);

        // Valida o novo XP.
        if (isNaN(novoXp) || novoXp < 0) {
          console.log("XP inválido!");
          return mostrarMenu();
        }

        // Atualiza a propriedade "nome" do herói encontrado.
        // herois[indice] acessa o herói na posição encontrada.
        herois[indice].nome = novoNome;

        // Atualiza a propriedade "xp".
        herois[indice].xp = novoXp;

        // Recalcula e atualiza a propriedade "nivel".
        herois[indice].nivel = calcularNivel(novoXp);

        // Exibe mensagem de sucesso.
        console.log("Herói editado com sucesso!");

        // Mostra o nome e nível atualizados.
        console.log(
          `O Herói de nome ${herois[indice].nome} está no nível de ${herois[indice].nivel}`
        );

        // Volta ao menu principal.
        mostrarMenu();
      });
    });
  });
}

// Declara uma função auxiliar para listar heróis sem retornar ao menu.
// Ela foi criada para ser reutilizada dentro da edição.
function consultarHeroisSemVoltar() {

  // Mostra o título da listagem.
  console.log("\n=== HERÓIS CADASTRADOS ===");

  // Percorre o array de heróis.
  herois.forEach(function(heroi) {

    // Mostra os dados de cada herói.
    console.log(
      `ID: ${heroi.id} | Nome: ${heroi.nome} | XP: ${heroi.xp} | Nível: ${heroi.nivel}`
    );
  });
}

// Chama a função mostrarMenu pela primeira vez.
// Essa linha inicia o programa.
mostrarMenu();