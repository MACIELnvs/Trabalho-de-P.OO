import { Conta } from "./Conta.js";

export class Poupanca extends Conta {
  #rendimento;

  constructor(cliente, saldo = 0.0, rendimento = 0.005) {
    super(cliente, saldo);
    this.#rendimento = rendimento;
  }

  viraMes() {
    // usar this.saldo (acessa getter/setter herdado) ao invés de super.saldo
    if (this.saldo > 0) {
      const valorRendimento = this.saldo * this.#rendimento;
      super.depositar(valorRendimento);
    }
  }

  toString() {
    let base = super.toString();
    base += "\n-- Poupança --";
    base += "\nRendimento (mensal): " + (this.#rendimento * 100).toFixed(3) + "%";
    return base;
  }
}
