function calcular() {
    const salario = parseFloat(document.getElementById('salario').value);
    const motivo = document.getElementById('motivo').value;
    const feriasVencidas = parseInt(document.getElementById('ferias').value);
    const dataAdmissao = new Date(document.getElementById('data-admissao').value);
    const dataSaida = new Date(document.getElementById('data-saida').value);

    if (isNaN(salario) || isNaN(dataAdmissao.getTime()) || isNaN(dataSaida.getTime())) {
        alert("Preencha o salário e as datas corretamente!");
        return;
    }

    // 1. CÁLCULO DO TEMPO (Meses totais de contrato)
    let mesesTotais = (dataSaida.getFullYear() - dataAdmissao.getFullYear()) * 12;
    mesesTotais += dataSaida.getMonth() - dataAdmissao.getMonth();
    if (dataSaida.getDate() >= 15) mesesTotais++; // Regra de 15 dias para considerar o mês

    // 2. SALDO DE SALÁRIO (Pro Rata)
    const diaSaida = dataSaida.getUTCDate();
    const ultimoDiaMes = new Date(dataSaida.getUTCFullYear(), dataSaida.getUTCMonth() + 1, 0).getDate();
    const saldoSalario = (salario / ultimoDiaMes) * diaSaida;

    // 3. FGTS (O "Acúmulo de 8%")
    // Todo mês o patrão deposita 8% do salário. Calculamos o total que deveria estar na conta:
    const fgtsMensal = salario * 0.08;
    const saldoFGTSAcumulado = fgtsMensal * mesesTotais;

    // 4. MULTA DE 40% (Sobre o saldo acumulado)
    let multa40 = 0;
    if (motivo === "sem-justa-causa") {
        multa40 = saldoFGTSAcumulado * 0.40;
    }

    // 5. DÉCIMO TERCEIRO E FÉRIAS (Simplificados para o exemplo)
    const mesesAnoSaida = dataSaida.getUTCMonth() + 1;
    const decimoTerceiro = (salario / 12) * mesesAnoSaida;
    const feriasProporcionais = (salario / 12) * mesesAnoSaida;
    const umTerco = (feriasProporcionais + (feriasVencidas * salario)) / 3;

    // TOTAL FINAL
    const totalRescisao = saldoSalario + decimoTerceiro + feriasProporcionais + umTerco;
    const totalGeralComSaque = totalRescisao + saldoFGTSAcumulado + multa40;

    // EXIBIÇÃO NO HTML
    const res = document.getElementById('resultado');
    res.style.display = "block";
    res.innerHTML = `
        <h3>Resultado Detalhado</h3>
        <p>Tempo de serviço: <strong>${mesesTotais} meses</strong></p>
        <p>Saldo de SalárioC <strong>R$ ${saldoSalario.toFixed(2)}</strong></p>
        <hr>
        <p>FGTS Acumulado (8%): <strong>R$ ${saldoFGTSAcumulado.toFixed(2)}</strong></p>
        <p>Multa FGTS (40%): <strong>R$ ${multa40.toFixed(2)}</strong></p>
        <p style="background: #ffffff33; padding: 5px; border-radius: 5px;">
           Total FGTS (Saque): <strong>R$ ${(saldoFGTSAcumulado + multa40).toFixed(2)}</strong>
        </p>
        <hr>
        <p><strong>Total Bruto a Receber: R$ ${totalRescisao.toFixed(2)}</strong></p>
        <small>*O total bruto não inclui o saque do FGTS, que é retirado na Caixa.</small>
    `;
}
