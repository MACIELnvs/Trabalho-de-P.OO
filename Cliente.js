import { Pessoa } from "./Pessoa.js";

export class Cliente extends Pessoa {
    #pontuacaoFidelidade;
    #limiteCredito;
    #categoria; // COMUM, VIP, PCD

    constructor(nome, cpf, dtNasc, pontuacaoFidelidade = 0, limiteCredito = 100.0, categoria = "COMUM") {
        super(nome, cpf, dtNasc);
        this.pontuacaoFidelidade = pontuacaoFidelidade;
        this.limiteCredito = limiteCredito;
        this.categoria = (categoria ?? "COMUM").toUpperCase();
    }

    get pontuacaoFidelidade() {
        return this.#pontuacaoFidelidade;
    }
    set pontuacaoFidelidade(novaPontuacao) {
        if (typeof novaPontuacao === "number" && novaPontuacao >= 0) {
            this.#pontuacaoFidelidade = novaPontuacao;
        } else if (this.#pontuacaoFidelidade === undefined) {
            this.#pontuacaoFidelidade = 0;
        }
    }

    get limiteCredito() {
        return this.#limiteCredito;
    }
    set limiteCredito(novoLimite) {
        if (typeof novoLimite === "number" && novoLimite >= 0.0) {
            this.#limiteCredito = novoLimite;
        } else if (this.#limiteCredito === undefined) {
            this.#limiteCredito = 100.0;
        }
    }

    get categoria() {
        return this.#categoria;
    }

    set categoria(novaCategoria) {
        if (!novaCategoria) {
            if (this.#categoria === undefined) this.#categoria = "COMUM";
            return;
        }
        let cat = novaCategoria.toUpperCase();
        if (cat === "COMUM" || cat === "VIP" || cat === "PCD") {
            this.#categoria = cat;
        } else if (this.#categoria === undefined) {
            this.#categoria = "COMUM";
        }
    }

    toString() {
        return (super.toString() +
            "\nPontuação Fidelidade: " + (this.#pontuacaoFidelidade ?? 0) +
            "\nLimite de Crédito: " + (this.#limiteCredito ?? 0).toFixed(2) +
            "\nCategoria: " + (this.#categoria ?? "COMUM"));
    }
}
