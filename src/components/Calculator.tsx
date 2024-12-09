import { memo, useState } from "react";
import "./Calculator.css";

const Calculator = () => {
  const [valorAtual, setValorAtual] = useState<string>("0");
  const [operacaoPendente, setOperacaoPendente] = useState<string | null>(null);
  const [valorPendente, setValorPendente] = useState<string | null>(null);
  const [operacaoCompleta, setOperacaoCompleta] = useState<string>("");

  const numerosTeclado = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const operacoes = ["+", "-", "*", "/"];

  const adicionarValor = (valor: string) => {
    setValorAtual((anterior) =>
      anterior === "0" ? valor : `${anterior}${valor}`
    );
    setOperacaoCompleta((anterior) => `${anterior}${valor}`);
  };

  const limpar = () => {
    setValorAtual("0");
    setOperacaoPendente(null);
    setValorPendente(null);
    setOperacaoCompleta("");
  };

  const definirOperacao = (operacao: string) => {
    setValorPendente(valorAtual);
    setOperacaoPendente(operacao);
    setOperacaoCompleta(`${valorAtual} ${operacao} `);
    setValorAtual("");
  };

  const calcularResultado = () => {
    if (!operacaoPendente || !valorPendente) return;

    const numero1 = parseFloat(valorPendente);
    const numero2 = parseFloat(valorAtual);
    let resultado: number | string = "";

    switch (operacaoPendente) {
      case "+":
        resultado = numero1 + numero2;
        break;
      case "-":
        resultado = numero1 - numero2;
        break;
      case "*":
        resultado = numero1 * numero2;
        break;
      case "/":
        resultado = numero2 !== 0 ? numero1 / numero2 : "Erro";
        break;
    }

    setValorAtual(resultado.toString());
    setOperacaoCompleta(
      `${valorPendente} ${operacaoPendente} ${valorAtual} = ${resultado}`
    );
    setOperacaoPendente(null);
    setValorPendente(null);
  };

  return (
    <div className="calculator">
      <div className="complete-operation">{operacaoCompleta}</div>
      <div className="display">{valorAtual}</div>
      <div className="buttons">
        <button onClick={limpar}>AC</button>
        {numerosTeclado.map((num) => (
          <button key={num} onClick={() => adicionarValor(num)}>
            {num}
          </button>
        ))}
        {operacoes.map((operacao) => (
          <button key={operacao} onClick={() => definirOperacao(operacao)}>
            {operacao}
          </button>
        ))}
        <button onClick={calcularResultado}>=</button>
      </div>
    </div>
  );
};

export default memo(Calculator);
