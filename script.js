function calcular() {
    // Pegando os valores e transformando em números reais (float)
    const salario = parseFloat(document.getElementById('salario').value);
    const motivo = document.getElementById('motivo').value;
    const feriasVencidas = parseInt(document.getElementById('ferias').value);

    // Validação simples
    if (isNaN(salario) || salario <= 0) {
        alert("Digite um salário válido!");
        return;
    }

    // Lógica básica de cálculo
    let saldoSalario = salario; // Valor fictício
    let decimoTerceiro = salario / 12;
    let total = saldoSalario + decimoTerceiro;

    // Cálculo das férias se houver vencidas
    if (feriasVencidas > 0) {
        total += (salario + (salario / 3)) * feriasVencidas;
    }

    // Multa de 40% se for demissão sem justa causa
    if (motivo === "sem-justa-causa") {
        total += (salario * 0.4); 
    }

    // Mostrando na tela
    const res = document.getElementById('resultado');
    res.style.display = "block";
    res.innerHTML = `
        <h3>Total Estimado</h3>
        <p>Valor Bruto: <strong>R$ ${total.toFixed(2)}</strong></p>
        <small>*Valores baseados em médias mensais.</small>
    `;
}