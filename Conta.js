import { Pessoa } from "./Pessoa.js";

export class Conta {

    static #quantidadeContas = 0;
    #saldo;
    #id;
    #titular;

    constructor(cliente, saldoInicial = 0.0) {
        if (cliente instanceof Pessoa) {
            this.#titular = cliente;
        } else {
            this.#titular = undefined;
        }

        if (typeof saldoInicial !== "number" || saldoInicial < 0) {
            this.#saldo = 0.0;
        } else {
            this.#saldo = saldoInicial;
        }

        Conta.#quantidadeContas++;
        this.#id = "" + new Date().getFullYear() + Conta.#quantidadeContas;
    }

    get saldo() {
        return this.#saldo;
    }

  /*  set saldo(novoSaldo) {
        if (typeof novoSaldo === "number") this.#saldo = novoSaldo;
    }
*/
    static get quantidadeContas() {
        return Conta.#quantidadeContas;
    }

    get id() {
        return this.#id;
    }

    get titular() {
        return this.#titular;
    }

    set titular(cliente) {
        if (cliente != undefined && cliente instanceof Pessoa) {
            this.#titular = cliente;
        }
    }

    depositar(valorDeposito) {
        if (typeof valorDeposito === "number" && valorDeposito > 0) {
            this.#saldo += valorDeposito;
            return true;
        }
        return false;
    }

    sacar(valorSaque) {
        if (typeof valorSaque !== "number" || valorSaque <= 0) return false;
        if (valorSaque <= this.#saldo) {
            this.#saldo -= valorSaque;
            return true;
        }
        return false;
    }

 /*   depositar(valorDeposito) {
        if (typeof valorDeposito === "number" && valorDeposito > 0) {
            this.#saldo += valorDeposito;
            return true;
        }
        return false;
    }

    sacar(valorSaque) {
        if (typeof valorSaque !== "number" || valorSaque <= 0) return false;
        if (valorSaque <= this.#saldo) {
            this.#saldo -= valorSaque;
            return true;
        }
        return false;
    }
*/
    transferir(valor, contaDestino) {
        if (!(contaDestino instanceof Conta)) {
            return false
        }

        if (typeof valor !== "number" || valor <= 0) {
            return false;
        }

        let saqueAutorizado = this.sacar(valor);
        if (saqueAutorizado) {
            // se sacou, deposita no destino
            contaDestino.depositar(valor);
            return true;
        }
        return false;

    //nao preciso passa o parametro de conta origem pois a funcao acontece na propria conta de origem.
    }



    toString() {
        let titularStr = this.titular ? this.titular.toString() : "\nTitular: (não definido)";
        return ("ID: " + this.#id + "\nSaldo: " + this.#saldo.toFixed(2) + "\n" + titularStr);
    }


 /*   viraMes() {

        return true;
    }
*/

}

