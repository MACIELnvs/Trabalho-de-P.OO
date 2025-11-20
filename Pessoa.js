export class Pessoa {
    #nome;
    #cpf;
    #dtNascimento;

    constructor(nome, cpf, dtNasc) {
        this.#nome = nome ?? "";
        this.#cpf = cpf ?? "";
        this.#dtNascimento = dtNasc ?? "";
    }

    get nome() {
        return this.#nome;
    }

    set nome(nome) {
        if (typeof nome === "string" && nome.trim().length !== 0) {
            this.#nome = nome;
        }
    }

    get cpf() {
        return this.#cpf;
    }

    get dtNascimento() {
        return this.#dtNascimento;
    }

    set dtNascimento(dtNascimento) {
        this.#dtNascimento = dtNascimento;
    }

    toString() {
        return (
            "\nNome: " + this.#nome +
            "\nCPF: " + this.#cpf +
            "\nNascimento: " + this.#dtNascimento
        );
    }
}
