const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let herois = [];
let proximoId = 1;

function calcularNivel(xp) {
  if (xp <= 1000) {
    return "Ferro";
  } else if (xp <= 2000) {
    return "Bronze";
  } else if (xp <= 5000) {
    return "Prata";
  } else if (xp <= 7000) {
    return "Ouro";
  } else if (xp <= 8000) {
    return "Platina";
  } else if (xp <= 9000) {
    return "Ascendente";
  } else if (xp <= 10000) {
    return "Imortal";
  } else {
    return "Radiante";
  }
}

function mostrarMenu() {
  console.log("\n=== MENU DE HERÓIS ===");
  console.log("1 - Cadastrar herói");
  console.log("2 - Consultar heróis");
  console.log("3 - Editar herói");
  console.log("4 - Sair");

  rl.question("Escolha uma opção: ", function(opcao) {
    switch (opcao) {
      case "1":
        cadastrarHeroi();
        break;
      case "2":
        consultarHerois();
        break;
      case "3":
        editarHeroi();
        break;
      case "4":
        console.log("Encerrando programa...");
        rl.close();
        break;
      default:
        console.log("Opção inválida!");
        mostrarMenu();
    }
  });
}

function cadastrarHeroi() {
  rl.question("Digite o nome do herói: ", function(nome) {
    rl.question("Digite a quantidade de XP: ", function(xpInformado) {
      let xp = parseInt(xpInformado);

      if (isNaN(xp) || xp < 0) {
        console.log("XP inválido!");
        return mostrarMenu();
      }

      let nivel = calcularNivel(xp);

      let heroi = {
        id: proximoId++,
        nome: nome,
        xp: xp,
        nivel: nivel
      };

      herois.push(heroi);

      console.log(`O Herói de nome ${heroi.nome} foi cadastrado com sucesso!`);
      console.log(`Ele está no nível de ${heroi.nivel}`);

      mostrarMenu();
    });
  });
}

function consultarHerois() {
  if (herois.length === 0) {
    console.log("Nenhum herói cadastrado.");
  } else {
    console.log("\n=== HERÓIS CADASTRADOS ===");
    herois.forEach(function(heroi) {
      console.log(
        `ID: ${heroi.id} | Nome: ${heroi.nome} | XP: ${heroi.xp} | Nível: ${heroi.nivel}`
      );
    });
  }

  mostrarMenu();
}

function editarHeroi() {
  if (herois.length === 0) {
    console.log("Nenhum herói cadastrado para editar.");
    return mostrarMenu();
  }

  consultarHeroisSemVoltar();

  rl.question("Digite o ID do herói que deseja editar: ", function(idInformado) {
    let id = parseInt(idInformado);

    let indice = herois.findIndex(function(heroi) {
      return heroi.id === id;
    });

    if (indice === -1) {
      console.log("Herói não encontrado.");
      return mostrarMenu();
    }

    rl.question("Novo nome do herói: ", function(novoNome) {
      rl.question("Novo XP do herói: ", function(novoXpInformado) {
        let novoXp = parseInt(novoXpInformado);

        if (isNaN(novoXp) || novoXp < 0) {
          console.log("XP inválido!");
          return mostrarMenu();
        }

        herois[indice].nome = novoNome;
        herois[indice].xp = novoXp;
        herois[indice].nivel = calcularNivel(novoXp);

        console.log("Herói editado com sucesso!");
        console.log(
          `O Herói de nome ${herois[indice].nome} está no nível de ${herois[indice].nivel}`
        );

        mostrarMenu();
      });
    });
  });
}

function consultarHeroisSemVoltar() {
  console.log("\n=== HERÓIS CADASTRADOS ===");
  herois.forEach(function(heroi) {
    console.log(
      `ID: ${heroi.id} | Nome: ${heroi.nome} | XP: ${heroi.xp} | Nível: ${heroi.nivel}`
    );
  });
}

mostrarMenu();
