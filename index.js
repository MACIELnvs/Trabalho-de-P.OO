import { Conta } from './Conta.js';
import { Poupanca } from './Poupanca.js';
import { ContaCorrente } from './ContaCorrente.js';
import { Pessoa } from './Pessoa.js';


//elementos do HTML sobre pessoa
const pessoaNome = document.getElementById("pessoaNome");
const pessoaCpf = document.getElementById("pessoaCpf");
const pessoaDt = document.getElementById("pessoaDt");
const listarPessoas = document.getElementById("listarPessoas");

//elementos do HTML sobre conta
const titular = document.getElementById("titular");
const tipoConta = document.getElementById("tipoConta");
const saldoInicial = document.getElementById("saldoInicial");

//elemenntos do HTML sobre saidas com o viraMes aplicado
const saida = document.getElementById("saida");

//elementos do HTML sobre saque 
const sacValor = document.getElementById("sacValor");
const sacTitular = document.getElementById("sacTitular");
const saidaSaque = document.getElementById("saidaSaque");

//elementos do HTML sobre depósito
const depTitular = document.getElementById("depTitular");
const depValor = document.getElementById("depValor");
const saidaDeposito = document.getElementById("saidaDeposito");

//elementos sobre transferência
const transOrigem = document.getElementById("transOrigem");
const transDestino = document.getElementById("transDestino");
const transValor = document.getElementById("transValor");
const saidaTransferencia = document.getElementById("saidaTransferencia");

// vetores para armazenar pessoas e contas
const vetPessoas = [];
const vetContas = [];

// ====================================================================================

// ================= Função criar pessoa =====================

function criarPessoa() {
    const nome = pessoaNome.value.trim();
    const cpf = pessoaCpf.value.trim();
    const dtNasc = pessoaDt.value;

    if (!nome || !cpf) {
        alert("Nome e CPF são obrigatórios.");
        return false;
    } else {

        let cpfSendoUsado = vetPessoas.find(function (pessoaParametro) {

            if (pessoaParametro.cpf == cpf) {
                return true;
            } else {
                return false;
            }
        });

        if (cpfSendoUsado) {

            alert(" CPF já está sendo utilizado.")

        } else {
            const pessoa = new Pessoa(nome, cpf, dtNasc);
            vetPessoas.push(pessoa);

            listarPessoas.innerText = vetPessoas
                .map((pessoa, i) => `${i + 1}. ${pessoa.nome} (CPF: ${pessoa.cpf})`)
                .join("\n");

            pessoaNome.value = "";
            pessoaCpf.value = "";
            pessoaDt.value = "";

            console.log(vetPessoas);
        }
    }
}



// ================= Função criar conta =====================

function criarConta() {

    var titularConta = titular.value;
    var tipo = tipoConta.value;   // corrente ou poupanca
    var saldo = Number(saldoInicial.value);

    //tentei suar includes mas incldes nao funciona com objetos, tenho que sar find.
    let pessoaEncontrada = vetPessoas.find(function (pessoaParametro) {

        if (pessoaParametro.nome === titularConta || pessoaParametro.cpf === titularConta) {
            return true;    // achou a pessoa
        } else {
            return false;   // não tem essa pessoa
        }

    });

    let conta; // declarar a variavel conta aqui
    if (pessoaEncontrada) {

        if (tipo === "corrente") {
            conta = new ContaCorrente(pessoaEncontrada, saldo);
            alert("conta corrente criada com sucesso com o saldo inicial de " + conta.saldo + "!!");

        } else if (tipo === "poupanca") {
            conta = new Poupanca(pessoaEncontrada, saldo);
            alert("conta poupança criada com sucesso com o saldo inicial de " + conta.saldo + "!!"); 


        } else {
            alert("Tipo de conta inválido!");
            return false;
        }

    } else {
        alert("Pessoa não encontrada!");
        return false;
    }

    vetContas.push(conta); // add a conta ao vetor de contas, independente do tipo.
    console.log(vetContas);
    return true;
}

// FUNÇÃO: Depositar


function depositarJS() {
    const nome = depTitular.value.trim();
    const valor = Number(depValor.value);

    if (!nome || isNaN(valor) || valor <= 0) {
        alert("Titular e valor válidos são necessários.");
        return false;
    }

    const conta = encontrarContaPorTitular(nome);

    if (!conta) {
        alert("Conta não encontrada.");
        return false;
    }

    const sucesso = conta.depositar(valor);

    if (sucesso) {
        saidaDeposito.innerText =
            "Depósito realizado.\n\n" + conta.toString();
        return true;
    } else {
        saidaDeposito.innerText = "Falha no depósito.";
        return false;
    }
}

// ================= Função sacar =====================


function sacarJS() { //na funcao sacar no index eu nao preciso passar parametros, e pego o valor da tela e passo pra funcao dentro da classe Conta;

    let titularContaSac = sacTitular.value;
    let valorSaque = Number(sacValor.value);

    let contaEncontrada = vetContas.find(function (contaParametro) {

        if (contaParametro.titular.nome === titularContaSac ||
            contaParametro.titular.cpf === titularContaSac) {
            return true;
        } else {
            return false;
        }
    });

    if (contaEncontrada) {

        let sacAprovado = contaEncontrada.sacar(valorSaque); // AQUI É A CHAMADA IMPORTANTE
        //pq contaEncontrada é um objeto Conta? sendo que nao esta explicito?
        //R: porque no vetorConta, eu so coloco objetos do tipo Conta, entao se eu acessar um elemento desse vetor...
        //ele vai ser sempre uum obnjeto de Conta, entao posso chamar os metodos da classe Conta nele.

        if (sacAprovado) {
            saidaSaque.innerText =
                "Saque realizado!\n\n" +
                contaEncontrada.toString(); // já imprime ID, saldo e titular
            return true;
        }
        else {
            saidaSaque.innerText =
                "Saque não autorizado ou valor inválido.";
            return false;
        }
    }
    return false;
}


// FUNÇÃO: Transferir


function transferir() {
    const origemNome = transOrigem.value.trim();
    const destinoNome = transDestino.value.trim();
    const valor = Number(transValor.value);

    if (!origemNome || !destinoNome || isNaN(valor) || valor <= 0) {
        alert("Origem, destino e valor válidos são necessários.");
        return false;
    }

    const contaOrigem = encontrarContaPorTitular(origemNome);
    const contaDestino = encontrarContaPorTitular(destinoNome);

    if (!contaOrigem || !contaDestino) {
        alert("Conta origem ou destino não encontrada.");
        return false;
    }

    const sucesso = contaOrigem.transferir(valor, contaDestino);

    if (sucesso) {
        saidaTransferencia.innerText =
            "Transferência realizada com sucesso.\n\n" +
            "Origem:\n" + contaOrigem.toString() +
            "\n\nDestino:\n" + contaDestino.toString();
        return true;
    } else {
        saidaTransferencia.innerText =
            "Transferência falhou (saldo insuficiente ou erro).";
        return false;
    }
}


// FUNÇÃO: Mostrar Contas (com vira-mês)


function mostrarContas() {

    vetContas.forEach(conta => {
        if (typeof conta.viraMes === "function") conta.viraMes();
    });

    if (vetContas.length === 0) {
        saida.innerText = "Nenhuma conta cadastrada.";
        return;
    }

    saida.innerText = vetContas
        .map(c => c.toString())
        .join("\n\n----------------------\n\n");
}


// FUNÇÃO AUXILIAR: Encontrar conta por titular


function encontrarContaPorTitular(chave) {
    return vetContas.find(conta => {
        if (!conta.titular) return false;
        return conta.titular.nome === chave || conta.titular.cpf === chave;
    });
}

window.criarPessoa = criarPessoa;
window.criarConta = criarConta;
window.mostrarContas = mostrarContas;
window.sacar = sacarJS;
window.depositar = depositarJS;
window.transferir = transferir;
