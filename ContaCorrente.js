import { Conta } from "./Conta.js";

export class ContaCorrente extends Conta {

    #tarifa;
    #limiteCredito;
    #jurosMensais;
    #saldoDevedor;


    constructor(cliente, saldo = 0.0, tarifa = 19.85, limiteCredito = 100.0, jurosMensais = 0.0259, saldoDevedor = 0.0) {
        super(cliente, saldo);
        this.#tarifa = tarifa;
        this.#limiteCredito = limiteCredito;
        this.#jurosMensais = jurosMensais;
        this.#saldoDevedor = saldoDevedor;
    }


    sacar(valorSaque) {
        if (typeof valorSaque !== "number" || valorSaque <= 0) {
            console.log("Valor de saque inválido.");
            return false;
        }

        const saldoAtual = super.saldo;

        if (valorSaque <= saldoAtual) {
            //super.saldo = saldoAtual - valorSaque;

            super.sacar(valorSaque);
            console.log("Saque realizado com saldo disponível.");
            return true;
        }

        const excedente = valorSaque - saldoAtual;
        if (excedente <= (this.#limiteCredito - this.#saldoDevedor)) {

            //super.saldo = 0.0;
            super.sacar(saldoAtual);
            this.#saldoDevedor += excedente;
            //this.#limiteCredito -= excedente

            console.log("Saque realizado usando limite de crédito. Saldo devedor atualizado.");
            return true;
        }

        console.log("Saque não autorizado. Limite de crédito excedido.");
        return false;
    }


    depositar(valorDeposito) {
        if (typeof valorDeposito !== "number" || valorDeposito <= 0) {
            console.log("Valor de depósito inválido.");
            return false;
        }

        if (this.#saldoDevedor > 0) {
            if (valorDeposito >= this.#saldoDevedor) {

                const restante = valorDeposito - this.#saldoDevedor;
                this.#saldoDevedor = 0.0;
                super.saldo = super.saldo + restante;
            } else {

                this.#saldoDevedor = this.#saldoDevedor - valorDeposito;
            }
            return true;
        } else {
            super.depositar(valorDeposito);
            //super.saldo = super.saldo + valorDeposito;
            //nao da pra acessar e modificar o saldo diretamente, pois o atributo #saldo é privado.
            return true;
        }
    }


    viraMes() {

        if (super.saldo > 0) {
            if (super.saldo >= this.#tarifa) {
                super.sacar(this.#tarifa);
            } else {

                const diferenca = this.#tarifa - super.saldo; //saldo é menor que a tarifa, entao sp0onhamos q saldo seja 10, 19.85-10 = 9.85; 
                // 9.85 vai ser adicionado ao saldoDevedor;
                super.sacar(super.saldo); //zerou a conta
                // super.saldo = 0.0; mesma coisa, estaria usando o set, mas saldo é privado
                this.#saldoDevedor += diferenca;
            }
        } else {

            //se estamos usando  o limite de credito(pq saldo <0), entao cobra o juros * saldoDevedor;
            const juros = this.#saldoDevedor * this.#jurosMensais;
            this.#saldoDevedor += juros + this.#tarifa;

        }

        /* 
                if (super.saldo <0) {
                        
                    const juros = this.#saldoDevedor * this.#jurosMensais;
        
        
                    } */
        /* else if ((super.saldo + this.#saldoDevedor) < 0) {

            const dif = this.#tarifa - super.saldo;

            super.sacar(super.saldo);  //zerou a conta

            // super.saldo = 0.0; mesma coisa, estaria usando o set, mas saldo é privado

            this.#saldoDevedor += dif;
        } else {
            const juros = this.#saldoDevedor * this.#jurosMensais;
            this.#saldoDevedor += juros;
        }

    } else {

        this.#saldoDevedor += this.#tarifa;
    } */

        /* 
         (this.#saldoDevedor > 0) {
            const juros = this.#saldoDevedor * this.#jurosMensais;
            this.#saldoDevedor += juros;*/
    }

    toString() {
        // incluir informação de saldoDevedor, limite e tarifa
        let base = super.toString();
        base += ("\n-- Conta Corrente --");
        base += ("\nTarifa Mensal: " + this.#tarifa.toFixed(2));
        base += ("\nLimite de Crédito: " + this.#limiteCredito.toFixed(2));
        base += ("\nSaldo Devedor: " + this.#saldoDevedor.toFixed(2));
        return base;
    }
}
