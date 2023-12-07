function showOption(option) {
  document.querySelectorAll(".content").forEach((content) => {
    content.style.display = "none";
  });
  document.getElementById(`content-${option}`).style.display = "block";
}

function limparInputs(formId) {
  const form = document.getElementById(formId);
  if (form) {
    const inputs = form.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const biblioteca = new Biblioteca();

  const addItemForm = document.getElementById("addItemForm");
  addItemForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const tipoItem = document.getElementById("itemType").value;
    const titulo = document.getElementById("itemTitle").value;
    const autor = document.getElementById("itemAuthor").value;
    const anoPublicacao = document.getElementById("itemYear").value;
    const codigo = document.getElementById("itemCode").value;

    if (tipoItem === "Livro") {
      const genero = document.getElementById("itemGenre").value;
      const novoLivro = new Livro(
        titulo,
        autor,
        anoPublicacao,
        codigo,
        false,
        null,
        genero
      );
      biblioteca.adicionaritem(novoLivro);
    } else if (tipoItem === "Revista") {
      const edicao = document.getElementById("itemEdition").value;
      const novaRevista = new Revista(
        titulo,
        autor,
        anoPublicacao,
        codigo,
        false,
        null,
        edicao
      );
      biblioteca.adicionaritem(novaRevista);
    }
  });

  window.adicionarUsuario = function () {
    const nomeUsuario = document.getElementById("userName").value;
    const registroAcademico = document.getElementById("userRegistration").value;
    const dataNascimento = document.getElementById("userBirthdate").value;

    const novoUsuario = new usuario(
      nomeUsuario,
      registroAcademico,
      dataNascimento
    );
    biblioteca.adicionarUser(novoUsuario);

    console.log(`Usuário ${nomeUsuario} foi adicionado a biblioteca`);
    atualizarListaUsuarios();
  };

  const addUserForm = document.getElementById("addUserForm");
  addUserForm.addEventListener("submit", function (event) {
    event.preventDefault();
    adicionarUsuario();
  });

  window.listarAcervo = function () {
    biblioteca.listarAcervo();
  };

  function atualizarListaUsuarios() {
    const listaUsuarios = document.getElementById("userList");
    listaUsuarios.innerHTML = "";

    biblioteca.usuarios.forEach((usuario) => {
      const li = document.createElement("li");
      li.textContent = `${usuario.nome} - ${usuario.registroAcademico}`;
      listaUsuarios.appendChild(li);
    });
  }

  window.emprestarItem = function () {
    const codigo = document.getElementById("itemCodeLoan").value;
    let codigoExiste = biblioteca.acervo.find((item) => item.codigo == codigo);
    if (!codigoExiste) {
      console.log(`O livro com código: ${codigo} não foi encontrado no acervo`);
      alert(`O livro com código: ${codigo} não foi encontrado no acervo`);
      return;
    }
    const registroAcademico = document.getElementById(
      "userRegistrationLoan"
    ).value;
    let registroAcademicoExiste = biblioteca.usuarios.find(
      (usuario) => usuario.registroAcademico == registroAcademico
    );
    if (!registroAcademicoExiste) {
      alert(`O usuário ${registroAcademico} não foi encontrado`);
    } else {
      biblioteca.emprestarItem(codigo, registroAcademico);
    }
  };

  window.devolverItem = function () {
    const codigo = document.getElementById("itemCodeBack").value;
    const registroAcademico = document.getElementById(
      "userRegistrationBack"
    ).value;

    biblioteca.devolverItem(codigo, registroAcademico);
  };

  function showAdditionalFields() {
    const tipoItem = document.getElementById("itemType").value;
    const genreField = document.getElementById("genero-content");
    const editionField = document.getElementById("edition-content");

    document.getElementById("itemGenre").value = "";
    document.getElementById("itemEdition").value = "";

    if (tipoItem === "Livro") {
      genreField.style.display = "block";
      editionField.style.display = "none";
    } else if (tipoItem === "Revista") {
      genreField.style.display = "none";
      editionField.style.display = "block";
    } else {
      genreField.style.display = "none";
      editionField.style.display = "none";
    }
  }

  const itemTypeSelect = document.getElementById("itemType");
  itemTypeSelect.addEventListener("change", showAdditionalFields);
});

class EntidadeBibliografica {
  constructor(
    titulo,
    autor,
    anoPublicacao,
    codigo,
    emprestado,
    usuarioEmprestimo
  ) {
    this.titulo = titulo;
    this.autor = autor;
    this.anoPublicacao = anoPublicacao;
    this.codigo = codigo;
    this.emprestado = emprestado;
    this.usuarioEmprestimo = usuarioEmprestimo;
  }

  emprestar(usuario) {
    if (this.emprestado == true) {
      console.log("Este livro já está emprestado!");
    } else {
      this.emprestado = true;
      this.usuarioEmprestimo = usuario;
    }
  }

  devolver() {
    if (this.emprestado == false) {
      console.log("Este livro não está emprestado!");
    } else {
      this.emprestado = false;
      this.usuarioEmprestimo = null;
    }
  }
}

const generolivro = {
  FANTASIA: "Fantasia",
  DRAMA: "Drama",
  INFANTIL: "Infantil",
  SUSPENSE: "Suspense",
  TERROR: "Terror",
  COMÉDIA: "Comédia",
  FICÇÃO: "Ficção",
};

class Livro extends EntidadeBibliografica {
  constructor(
    titulo,
    autor,
    anoPublicacao,
    codigo,
    emprestado,
    usuarioEmprestimo,
    genero
  ) {
    super(titulo, autor, anoPublicacao, codigo, emprestado, usuarioEmprestimo);
    this.genero = genero;
  }

  getInformações() {
    console.log(
      "Nome: " +
        this.titulo +
        " Autor: " +
        this.autor +
        " Ano de Publicação: " +
        this.anoPublicacao +
        " Código: " +
        this.codigo +
        " Emprestado: " +
        this.emprestado +
        " Usuário do Empréstimo: " +
        this.usuarioEmprestimo +
        " Gênero: " +
        this.genero
    );
  }
}

class Revista extends EntidadeBibliografica {
  constructor(
    titulo,
    autor,
    anoPublicacao,
    codigo,
    emprestado,
    usuarioEmprestimo,
    edicao
  ) {
    super(titulo, autor, anoPublicacao, codigo, emprestado, usuarioEmprestimo);
    this.edicao = edicao;
  }
}

class usuario {
  constructor(nome, registroAcademico, dataNascimento) {
    this.nome = nome;
    this.registroAcademico = registroAcademico;
    this.dataNascimento = dataNascimento;
  }
}

class Biblioteca {
  constructor(acervo = [], usuarios = []) {
    this.acervo = acervo;
    this.usuarios = usuarios;
  }

  adicionaritem(item) {
    const itemExistente = this.acervo.find(
      (itemExistente) => itemExistente.codigo === item.codigo
    );
    if (itemExistente) {
      console.log(`Já existe um livro com o código ${item.codigo} no acervo!`);
      alert(`Já existe um livro com o código ${item.codigo} no acervo!`);
    } else {
      this.acervo.push(item);
      console.log(`O livro ${item.titulo} foi adicionado a biblioteca`);
      alert(`O livro ${item.titulo} foi adicionado a biblioteca`);
      limparInputs("addItemForm");
    }
  }

  listarAcervo() {
    const acervoList = document.getElementById("acervoList");
    acervoList.innerHTML = "";

    this.acervo.forEach((item) => {
      console.log(item);
      const row = acervoList.insertRow();

      const cellCodigo = row.insertCell(0);
      cellCodigo.textContent = item.codigo;

      const cellTitulo = row.insertCell(1);
      cellTitulo.textContent = item.titulo;

      const cellStatus = row.insertCell(2);
      cellStatus.textContent = item.emprestado ? "Emprestado" : "Disponível";
    });
    showOption("acervo-list");
  }

  adicionarUser(usuario) {
    console.log(`O usuário: ${usuario.nome} foi adicionado a biblioteca`);
    this.usuarios.push(usuario);
    limparInputs("addUserForm");
  }

  listarUsuarios() {
    console.log(this.usuarios);
  }

  emprestarItem(codigo, registroAcademico) {
    let item = this.acervo.find((item) => item.codigo == codigo);
    if (item) {
      let usuario = this.usuarios.find(
        (usuario) => usuario.registroAcademico == registroAcademico
      );
      if (item.emprestado) {
        console.log(`O item ${item.titulo} já está emprestado`);
        alert(`O item ${item.titulo} já está emprestado`);
      } else if (usuario) {
        item.emprestar(usuario);
        limparInputs("loanItemForm");
        console.log(
          `O item: ${item.titulo} foi emprestado para o cadastro: ${registroAcademico}`
        );
        alert(
          `O item: ${item.titulo} foi emprestado para o cadastro: ${registroAcademico}`
        );
      } else {
        console.log(`O usuário ${registroAcademico} não foi encontrado`);
        alert(`O usuário ${registroAcademico} não foi encontrado`);
      }
    } else {
      console.log(`O código: ${codigo} não foi encontrado no acervo`);
      alert(`O código: ${codigo} não foi encontrado no acervo`);
    }
  }

  devolverItem(codigo, registroAcademico) {
    let item = this.acervo.find((item) => item.codigo == codigo);
    if (item) {
      let usuario = this.usuarios.find(
        (usuario) => usuario.registroAcademico == registroAcademico
      );
      if (!item.emprestado) {
        console.log(`O item ${item.titulo} não está emprestado`);
        alert(`O item ${item.titulo} não está emprestado`);
      } else if (usuario) {
        item.devolver(usuario);
        limparInputs("loanItemForm");
        console.log(`O item: ${item.titulo} foi devolvido com sucesso!`);
        alert(`O item foi devolvido com sucesso!`);
      } else {
        console.log(`O usuário ${registroAcademico} não foi encontrado`);
        alert(`O usuário ${registroAcademico} não foi encontrado`);
      }
    } else {
      console.log(`O código: ${codigo} não foi encontrado no acervo`);
      alert(`O código: ${codigo} não foi encontrado no acervo`);
    }
  }
}
