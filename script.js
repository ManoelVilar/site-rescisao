/* ============================================================
   RESCISÃO
============================================================ */
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

    let mesesTotais = (dataSaida.getFullYear() - dataAdmissao.getFullYear()) * 12;
    mesesTotais += dataSaida.getMonth() - dataAdmissao.getMonth();
    if (dataSaida.getDate() >= 15) mesesTotais++;

    const diaSaida = dataSaida.getUTCDate();
    const ultimoDiaMes = new Date(dataSaida.getUTCFullYear(), dataSaida.getUTCMonth() + 1, 0).getDate();
    const saldoSalario = (salario / ultimoDiaMes) * diaSaida;

    const fgtsMensal = salario * 0.08;
    const saldoFGTSAcumulado = fgtsMensal * mesesTotais;

    let multa40 = 0;
    if (motivo === "sem-justa-causa") {
        multa40 = saldoFGTSAcumulado * 0.40;
    }

    const mesesAnoSaida = dataSaida.getUTCMonth() + 1;
    const decimoTerceiro = (salario / 12) * mesesAnoSaida;
    const feriasProporcionais = (salario / 12) * mesesAnoSaida;
    const umTerco = (feriasProporcionais + (feriasVencidas * salario)) / 3;

    const totalRescisao = saldoSalario + decimoTerceiro + feriasProporcionais + umTerco;

    const res = document.getElementById('resultado');
    res.style.display = "block";
    res.innerHTML = `
        <h3>Resultado Detalhado</h3>
        <p>Tempo de serviço: <strong>${mesesTotais} meses</strong></p>
        <p>Saldo de Salário: <strong>R$ ${saldoSalario.toFixed(2)}</strong></p>
        <hr>
        <p>FGTS Acumulado (8%): <strong>R$ ${saldoFGTSAcumulado.toFixed(2)}</strong></p>
        <p>Multa FGTS (40%): <strong>R$ ${multa40.toFixed(2)}</strong></p>
        <p style="background:#ffffff33;padding:5px;border-radius:5px;">
           Total FGTS (Saque): <strong>R$ ${(saldoFGTSAcumulado + multa40).toFixed(2)}</strong>
        </p>
        <hr>
        <p><strong>Total Bruto a Receber: R$ ${totalRescisao.toFixed(2)}</strong></p>
        <small>*O total bruto não inclui o saque do FGTS, que é retirado na Caixa.</small>
    `;
}

/* ============================================================
   ABAS
============================================================ */
function trocarAba(aba, btn) {
    document.querySelectorAll('.aba-conteudo').forEach(el => el.classList.remove('ativa'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    document.getElementById('aba-' + aba).classList.add('ativa');
    if (btn) btn.classList.add('active');
}

/* ============================================================
   TEMPLATES
============================================================ */
let templateSelecionado = null;

function selecionarTemplate(template, card) {
    templateSelecionado = template;
    document.querySelectorAll('.template-card').forEach(c => c.classList.remove('selecionado'));
    card.classList.add('selecionado');

    setTimeout(() => {
        document.getElementById('etapa-template').classList.remove('etapa-ativa');
        document.getElementById('etapa-template').classList.add('etapa-oculta');
        document.getElementById('etapa-formulario').classList.remove('etapa-oculta');
        document.getElementById('etapa-formulario').classList.add('etapa-ativa');

        const labels = {
            classico:    '📋 Template: Clássico & Formal',
            moderno:     '🎨 Template: Moderno & Colorido',
            minimalista: '⬜ Template: Minimalista',
            criativo:    '✨ Template: Criativo / Diferenciado',
        };
        document.getElementById('template-escolhido-label').textContent = labels[template] || '';
    }, 200);
}

function voltarTemplates() {
    document.getElementById('etapa-formulario').classList.remove('etapa-ativa');
    document.getElementById('etapa-formulario').classList.add('etapa-oculta');
    document.getElementById('etapa-template').classList.remove('etapa-oculta');
    document.getElementById('etapa-template').classList.add('etapa-ativa');
}

/* ============================================================
   CAMPOS DINÂMICOS
============================================================ */
function adicionarExperiencia() {
    const container = document.getElementById('experiencias-container');
    const idx = container.querySelectorAll('.experiencia-item').length;
    const div = document.createElement('div');
    div.className = 'experiencia-item';
    div.dataset.index = idx;
    div.innerHTML = `
        <button class="btn-remover" onclick="this.closest('.experiencia-item').remove()">✕ Remover</button>
        <div class="campos-grid">
          <div class="campo-curriculo">
            <label>Empresa</label>
            <input type="text" class="exp-empresa" placeholder="Nome da Empresa">
          </div>
          <div class="campo-curriculo">
            <label>Cargo</label>
            <input type="text" class="exp-cargo" placeholder="Seu cargo">
          </div>
          <div class="campo-curriculo">
            <label>Período</label>
            <input type="text" class="exp-periodo" placeholder="Jan/2020 – Dez/2023">
          </div>
          <div class="campo-curriculo full-width">
            <label>Descrição das atividades</label>
            <textarea class="exp-descricao" rows="2" placeholder="Principais responsabilidades e conquistas..."></textarea>
          </div>
        </div>`;
    container.appendChild(div);
}

function adicionarFormacao() {
    const container = document.getElementById('formacoes-container');
    const idx = container.querySelectorAll('.formacao-item').length;
    const div = document.createElement('div');
    div.className = 'formacao-item';
    div.dataset.index = idx;
    div.innerHTML = `
        <button class="btn-remover" onclick="this.closest('.formacao-item').remove()">✕ Remover</button>
        <div class="campos-grid">
          <div class="campo-curriculo">
            <label>Instituição</label>
            <input type="text" class="form-instituicao" placeholder="Nome da Instituição">
          </div>
          <div class="campo-curriculo">
            <label>Curso</label>
            <input type="text" class="form-curso" placeholder="Ex: Administração de Empresas">
          </div>
          <div class="campo-curriculo">
            <label>Nível</label>
            <select class="form-nivel">
              <option>Ensino Médio</option><option>Técnico</option><option>Graduação</option>
              <option>Pós-Graduação</option><option>MBA</option><option>Mestrado</option><option>Doutorado</option>
            </select>
          </div>
          <div class="campo-curriculo">
            <label>Período</label>
            <input type="text" class="form-periodo" placeholder="2018 – 2022">
          </div>
        </div>`;
    container.appendChild(div);
}

/* ============================================================
   LER DADOS DO FORMULÁRIO
============================================================ */
function lerDadosCurriculo() {
    const experiencias = [];
    document.querySelectorAll('.experiencia-item').forEach(item => {
        const empresa   = item.querySelector('.exp-empresa')?.value.trim();
        const cargo     = item.querySelector('.exp-cargo')?.value.trim();
        const periodo   = item.querySelector('.exp-periodo')?.value.trim();
        const descricao = item.querySelector('.exp-descricao')?.value.trim();
        if (empresa || cargo) experiencias.push({ empresa, cargo, periodo, descricao });
    });

    const formacoes = [];
    document.querySelectorAll('.formacao-item').forEach(item => {
        const instituicao = item.querySelector('.form-instituicao')?.value.trim();
        const curso       = item.querySelector('.form-curso')?.value.trim();
        const nivel       = item.querySelector('.form-nivel')?.value.trim();
        const periodo     = item.querySelector('.form-periodo')?.value.trim();
        if (instituicao || curso) formacoes.push({ instituicao, curso, nivel, periodo });
    });

    const habilidadesRaw = document.getElementById('cv-habilidades').value.trim();
    const habilidades = habilidadesRaw ? habilidadesRaw.split(',').map(h => h.trim()).filter(Boolean) : [];

    return {
        nome:         document.getElementById('cv-nome').value.trim(),
        cargo:        document.getElementById('cv-cargo').value.trim(),
        email:        document.getElementById('cv-email').value.trim(),
        telefone:     document.getElementById('cv-telefone').value.trim(),
        linkedin:     document.getElementById('cv-linkedin').value.trim(),
        cidade:       document.getElementById('cv-cidade').value.trim(),
        objetivo:     document.getElementById('cv-objetivo').value.trim(),
        habilidades,
        experiencias,
        formacoes,
    };
}

/* ============================================================
   GERADOR DE CURRÍCULO .DOCX
============================================================ */
async function gerarCurriculo() {
    const dados = lerDadosCurriculo();

    if (!dados.nome || !dados.email) {
        alert('Preencha pelo menos o Nome e o E-mail!');
        return;
    }

    const btn = document.querySelector('.btn-gerar');
    btn.textContent = '⏳ Gerando...';
    btn.disabled = true;

    try {
        let docBuffer;
        switch (templateSelecionado) {
            case 'classico':    docBuffer = await gerarClassico(dados);    break;
            case 'moderno':     docBuffer = await gerarModerno(dados);     break;
            case 'minimalista': docBuffer = await gerarMinimalista(dados); break;
            case 'criativo':    docBuffer = await gerarCriativo(dados);    break;
            default:            docBuffer = await gerarClassico(dados);
        }

        const blob = new Blob([docBuffer], {
            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        });
        const nomeArquivo = `Curriculo_${dados.nome.replace(/\s+/g,'_')}.docx`;
        saveAs(blob, nomeArquivo);

        const res = document.getElementById('cv-resultado');
        res.style.display = 'block';
        res.innerHTML = `✅ Currículo gerado com sucesso! O download de <strong>${nomeArquivo}</strong> iniciou.`;
    } catch (e) {
        console.error(e);
        alert('Erro ao gerar o currículo. Verifique o console para detalhes.');
    }

    btn.textContent = '⬇️ GERAR E BAIXAR CURRÍCULO .DOCX';
    btn.disabled = false;
}

/* ============================================================
   HELPERS DOCX
============================================================ */
const {
    Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
    AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType,
    VerticalAlign, LevelFormat, UnderlineType
} = docx;

const CONTENT_W = 9360; // US Letter, 1" margins

function paragrafoVazio(espacoBefore = 0) {
    return new Paragraph({ spacing: { before: espacoBefore }, children: [new TextRun('')] });
}

function linhaHR(color = '999999', size = 6) {
    return new Paragraph({
        border: { bottom: { style: BorderStyle.SINGLE, size, color, space: 1 } },
        spacing: { before: 60, after: 60 },
        children: [new TextRun('')]
    });
}

function contatoStr(dados) {
    const parts = [];
    if (dados.email)    parts.push(dados.email);
    if (dados.telefone) parts.push(dados.telefone);
    if (dados.cidade)   parts.push(dados.cidade);
    if (dados.linkedin) parts.push(dados.linkedin);
    return parts.join('   |   ');
}

/* ============================================================
   TEMPLATE 1 — CLÁSSICO & FORMAL
============================================================ */
async function gerarClassico(d) {
    const children = [];

    // Cabeçalho
    children.push(new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 60 },
        children: [new TextRun({ text: d.nome.toUpperCase(), bold: true, size: 40, font: 'Times New Roman', color: '1a1a2e' })]
    }));
    if (d.cargo) {
        children.push(new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 80 },
            children: [new TextRun({ text: d.cargo, size: 24, font: 'Times New Roman', color: '444444', italics: true })]
        }));
    }
    children.push(new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 200 },
        children: [new TextRun({ text: contatoStr(d), size: 18, font: 'Times New Roman', color: '555555' })]
    }));

    function secaoClassica(titulo, conteudo) {
        children.push(new Paragraph({
            spacing: { before: 200, after: 40 },
            border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: '1a1a2e', space: 1 } },
            children: [new TextRun({ text: titulo.toUpperCase(), bold: true, size: 24, font: 'Times New Roman', color: '1a1a2e' })]
        }));
        conteudo();
        children.push(paragrafoVazio(80));
    }

    if (d.objetivo) {
        secaoClassica('Objetivo Profissional', () => {
            children.push(new Paragraph({
                spacing: { before: 80, after: 40 },
                children: [new TextRun({ text: d.objetivo, size: 22, font: 'Times New Roman' })]
            }));
        });
    }

    if (d.experiencias.length > 0) {
        secaoClassica('Experiência Profissional', () => {
            d.experiencias.forEach(exp => {
                children.push(new Paragraph({
                    spacing: { before: 100, after: 20 },
                    children: [
                        new TextRun({ text: exp.empresa || '', bold: true, size: 22, font: 'Times New Roman' }),
                        new TextRun({ text: exp.cargo ? '  —  ' + exp.cargo : '', size: 22, font: 'Times New Roman', italics: true }),
                    ]
                }));
                if (exp.periodo) {
                    children.push(new Paragraph({
                        spacing: { before: 0, after: 20 },
                        children: [new TextRun({ text: exp.periodo, size: 20, font: 'Times New Roman', color: '666666' })]
                    }));
                }
                if (exp.descricao) {
                    children.push(new Paragraph({
                        spacing: { before: 20, after: 40 },
                        children: [new TextRun({ text: exp.descricao, size: 20, font: 'Times New Roman' })]
                    }));
                }
            });
        });
    }

    if (d.formacoes.length > 0) {
        secaoClassica('Formação Acadêmica', () => {
            d.formacoes.forEach(f => {
                children.push(new Paragraph({
                    spacing: { before: 100, after: 20 },
                    children: [
                        new TextRun({ text: f.curso || '', bold: true, size: 22, font: 'Times New Roman' }),
                        new TextRun({ text: f.nivel ? ' (' + f.nivel + ')' : '', size: 22, font: 'Times New Roman', italics: true }),
                    ]
                }));
                if (f.instituicao || f.periodo) {
                    children.push(new Paragraph({
                        spacing: { before: 0, after: 40 },
                        children: [new TextRun({
                            text: [f.instituicao, f.periodo].filter(Boolean).join('  |  '),
                            size: 20, font: 'Times New Roman', color: '666666'
                        })]
                    }));
                }
            });
        });
    }

    if (d.habilidades.length > 0) {
        secaoClassica('Habilidades', () => {
            children.push(new Paragraph({
                spacing: { before: 80, after: 40 },
                children: [new TextRun({ text: d.habilidades.join('   •   '), size: 22, font: 'Times New Roman' })]
            }));
        });
    }

    const doc = new Document({
        sections: [{
            properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
            children
        }]
    });
    return await Packer.toBuffer(doc);
}

/* ============================================================
   TEMPLATE 2 — MODERNO & COLORIDO  (tabela 2 colunas)
============================================================ */
async function gerarModerno(d) {
    // Sidebar esquerda + corpo direito como tabela
    const sidebarW = 3000;
    const mainW    = CONTENT_W - sidebarW;

    function sideCell(children) {
        return new TableCell({
            width: { size: sidebarW, type: WidthType.DXA },
            shading: { fill: '4a3080', type: ShadingType.CLEAR },
            margins: { top: 200, bottom: 120, left: 220, right: 180 },
            children
        });
    }
    function mainCell(children) {
        return new TableCell({
            width: { size: mainW, type: WidthType.DXA },
            shading: { fill: 'f8f8fc', type: ShadingType.CLEAR },
            margins: { top: 200, bottom: 120, left: 240, right: 240 },
            children
        });
    }

    const noBorder = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
    const cellBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

    // ---- SIDEBAR paragraphs ----
    const sideParagraphs = [];
    sideParagraphs.push(new Paragraph({
        spacing: { before: 0, after: 60 },
        children: [new TextRun({ text: d.nome, bold: true, size: 30, font: 'Calibri', color: 'FFFFFF' })]
    }));
    if (d.cargo) {
        sideParagraphs.push(new Paragraph({
            spacing: { before: 0, after: 180 },
            children: [new TextRun({ text: d.cargo, size: 20, font: 'Calibri', color: 'ddb4ff', italics: true })]
        }));
    }

    function sideSecTitle(txt) {
        sideParagraphs.push(new Paragraph({
            spacing: { before: 200, after: 60 },
            border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: 'a855f7', space: 1 } },
            children: [new TextRun({ text: txt.toUpperCase(), bold: true, size: 18, font: 'Calibri', color: 'ddb4ff' })]
        }));
    }
    function sideLine(txt, color = 'e2e8f0') {
        sideParagraphs.push(new Paragraph({
            spacing: { before: 40, after: 20 },
            children: [new TextRun({ text: txt, size: 18, font: 'Calibri', color })]
        }));
    }

    sideSecTitle('Contato');
    if (d.email)    sideLine('✉ ' + d.email);
    if (d.telefone) sideLine('☎ ' + d.telefone);
    if (d.cidade)   sideLine('📍 ' + d.cidade);
    if (d.linkedin) sideLine('🔗 ' + d.linkedin);

    if (d.habilidades.length > 0) {
        sideSecTitle('Habilidades');
        d.habilidades.forEach(h => sideLine('• ' + h));
    }

    // ---- MAIN paragraphs ----
    const mainParagraphs = [];

    function mainSecTitle(txt) {
        mainParagraphs.push(new Paragraph({
            spacing: { before: 220, after: 60 },
            border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '7c3aed', space: 1 } },
            children: [new TextRun({ text: txt.toUpperCase(), bold: true, size: 22, font: 'Calibri', color: '4a3080' })]
        }));
    }

    if (d.objetivo) {
        mainSecTitle('Objetivo Profissional');
        mainParagraphs.push(new Paragraph({
            spacing: { before: 80, after: 40 },
            children: [new TextRun({ text: d.objetivo, size: 20, font: 'Calibri', color: '333333' })]
        }));
    }

    if (d.experiencias.length > 0) {
        mainSecTitle('Experiência Profissional');
        d.experiencias.forEach(exp => {
            mainParagraphs.push(new Paragraph({
                spacing: { before: 120, after: 20 },
                children: [new TextRun({ text: exp.empresa || '', bold: true, size: 22, font: 'Calibri', color: '1e1b4b' })]
            }));
            if (exp.cargo || exp.periodo) {
                mainParagraphs.push(new Paragraph({
                    spacing: { before: 0, after: 20 },
                    children: [
                        new TextRun({ text: exp.cargo || '', size: 20, font: 'Calibri', italics: true, color: '7c3aed' }),
                        new TextRun({ text: exp.periodo ? '   ' + exp.periodo : '', size: 18, font: 'Calibri', color: '888888' }),
                    ]
                }));
            }
            if (exp.descricao) {
                mainParagraphs.push(new Paragraph({
                    spacing: { before: 20, after: 40 },
                    children: [new TextRun({ text: exp.descricao, size: 20, font: 'Calibri', color: '444444' })]
                }));
            }
        });
    }

    if (d.formacoes.length > 0) {
        mainSecTitle('Formação Acadêmica');
        d.formacoes.forEach(f => {
            mainParagraphs.push(new Paragraph({
                spacing: { before: 120, after: 20 },
                children: [new TextRun({ text: f.curso || '', bold: true, size: 22, font: 'Calibri', color: '1e1b4b' })]
            }));
            mainParagraphs.push(new Paragraph({
                spacing: { before: 0, after: 40 },
                children: [
                    new TextRun({ text: f.nivel ? f.nivel + '  ' : '', size: 20, font: 'Calibri', italics: true, color: '7c3aed' }),
                    new TextRun({ text: [f.instituicao, f.periodo].filter(Boolean).join('   |   '), size: 18, font: 'Calibri', color: '888888' }),
                ]
            }));
        });
    }

    const row = new TableRow({
        children: [
            sideCell(sideParagraphs),
            mainCell(mainParagraphs)
        ]
    });

    const table = new Table({
        width: { size: CONTENT_W, type: WidthType.DXA },
        columnWidths: [sidebarW, mainW],
        rows: [row],
        borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder, insideH: noBorder, insideV: noBorder }
    });

    const doc = new Document({
        sections: [{
            properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 720, right: 720, bottom: 720, left: 720 } } },
            children: [table]
        }]
    });
    return await Packer.toBuffer(doc);
}

/* ============================================================
   TEMPLATE 3 — MINIMALISTA
============================================================ */
async function gerarMinimalista(d) {
    const children = [];

    // Nome grande
    children.push(new Paragraph({
        spacing: { before: 0, after: 40 },
        children: [new TextRun({ text: d.nome.toUpperCase(), bold: true, size: 52, font: 'Arial', color: '111111' })]
    }));

    if (d.cargo) {
        children.push(new Paragraph({
            spacing: { before: 0, after: 80 },
            children: [new TextRun({ text: d.cargo, size: 26, font: 'Arial', color: '888888' })]
        }));
    }

    // Linha divisória larga
    children.push(new Paragraph({
        border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: '111111', space: 1 } },
        spacing: { before: 60, after: 200 },
        children: [new TextRun('')]
    }));

    // Contato em linha
    children.push(new Paragraph({
        spacing: { before: 0, after: 240 },
        children: [new TextRun({ text: contatoStr(d), size: 19, font: 'Arial', color: '666666' })]
    }));

    function secaoMin(titulo, conteudo) {
        // Layout 2-coluna: label esquerda, conteúdo direita
        const labelW   = 2000;
        const contentW = CONTENT_W - labelW;

        const contentParagraphs = [];
        conteudo(contentParagraphs);

        const row = new TableRow({
            children: [
                new TableCell({
                    width: { size: labelW, type: WidthType.DXA },
                    margins: { top: 60, bottom: 60, left: 0, right: 200 },
                    borders: {
                        top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                        bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                        left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                        right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                    },
                    children: [new Paragraph({
                        children: [new TextRun({ text: titulo.toUpperCase(), bold: true, size: 17, font: 'Arial', color: '999999' })]
                    })]
                }),
                new TableCell({
                    width: { size: contentW, type: WidthType.DXA },
                    margins: { top: 60, bottom: 60, left: 0, right: 0 },
                    borders: {
                        top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                        bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                        left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                        right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                    },
                    children: contentParagraphs
                })
            ]
        });

        children.push(new Table({
            width: { size: CONTENT_W, type: WidthType.DXA },
            columnWidths: [labelW, contentW],
            rows: [row],
            borders: {
                top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                insideH: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
                insideV: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
            }
        }));

        children.push(new Paragraph({
            border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: 'eeeeee', space: 1 } },
            spacing: { before: 40, after: 120 },
            children: [new TextRun('')]
        }));
    }

    if (d.objetivo) {
        secaoMin('Objetivo', (p) => {
            p.push(new Paragraph({ children: [new TextRun({ text: d.objetivo, size: 21, font: 'Arial', color: '333333' })] }));
        });
    }

    if (d.experiencias.length > 0) {
        secaoMin('Experiência', (p) => {
            d.experiencias.forEach((exp, i) => {
                if (i > 0) p.push(paragrafoVazio(80));
                p.push(new Paragraph({
                    children: [
                        new TextRun({ text: exp.empresa || '', bold: true, size: 22, font: 'Arial' }),
                        new TextRun({ text: exp.cargo ? '  /  ' + exp.cargo : '', size: 20, font: 'Arial', color: '555555' }),
                    ]
                }));
                if (exp.periodo) p.push(new Paragraph({ children: [new TextRun({ text: exp.periodo, size: 18, font: 'Arial', color: 'aaaaaa' })] }));
                if (exp.descricao) p.push(new Paragraph({ spacing: { before: 40 }, children: [new TextRun({ text: exp.descricao, size: 20, font: 'Arial', color: '444444' })] }));
            });
        });
    }

    if (d.formacoes.length > 0) {
        secaoMin('Formação', (p) => {
            d.formacoes.forEach((f, i) => {
                if (i > 0) p.push(paragrafoVazio(60));
                p.push(new Paragraph({
                    children: [
                        new TextRun({ text: f.curso || '', bold: true, size: 22, font: 'Arial' }),
                        new TextRun({ text: f.nivel ? '  (' + f.nivel + ')' : '', size: 20, font: 'Arial', color: '777777' }),
                    ]
                }));
                p.push(new Paragraph({ children: [new TextRun({ text: [f.instituicao, f.periodo].filter(Boolean).join('   |   '), size: 18, font: 'Arial', color: 'aaaaaa' })] }));
            });
        });
    }

    if (d.habilidades.length > 0) {
        secaoMin('Habilidades', (p) => {
            p.push(new Paragraph({ children: [new TextRun({ text: d.habilidades.join('   ·   '), size: 21, font: 'Arial', color: '333333' })] }));
        });
    }

    const doc = new Document({
        sections: [{
            properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
            children
        }]
    });
    return await Packer.toBuffer(doc);
}

/* ============================================================
   TEMPLATE 4 — CRIATIVO / DIFERENCIADO
============================================================ */
async function gerarCriativo(d) {
    const children = [];

    // Cabeçalho com fundo colorido simulado via tabela
    const headerRow = new TableRow({
        children: [
            new TableCell({
                width: { size: CONTENT_W, type: WidthType.DXA },
                shading: { fill: '1a1a2e', type: ShadingType.CLEAR },
                margins: { top: 300, bottom: 300, left: 400, right: 400 },
                borders: {
                    top: { style: BorderStyle.NONE, size: 0, color: '1a1a2e' },
                    bottom: { style: BorderStyle.SINGLE, size: 12, color: 'e040fb', space: 1 },
                    left: { style: BorderStyle.NONE, size: 0, color: '1a1a2e' },
                    right: { style: BorderStyle.NONE, size: 0, color: '1a1a2e' },
                },
                children: [
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 0, after: 60 },
                        children: [new TextRun({ text: d.nome, bold: true, size: 52, font: 'Trebuchet MS', color: 'FFFFFF' })]
                    }),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 0, after: 40 },
                        children: [new TextRun({ text: d.cargo ? '✦  ' + d.cargo + '  ✦' : '', size: 24, font: 'Trebuchet MS', color: 'e040fb', italics: true })]
                    }),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 0, after: 0 },
                        children: [new TextRun({ text: contatoStr(d), size: 18, font: 'Trebuchet MS', color: 'cccccc' })]
                    }),
                ]
            })
        ]
    });

    children.push(new Table({
        width: { size: CONTENT_W, type: WidthType.DXA },
        columnWidths: [CONTENT_W],
        rows: [headerRow],
        borders: {
            top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
            bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
            left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
            right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
            insideH: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
            insideV: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
        }
    }));

    children.push(paragrafoVazio(180));

    // Corpo em 2 colunas: esquerda (Objetivo + Habilidades) | direita (Experiência + Formação)
    const colW = Math.floor(CONTENT_W / 2);
    const noBorder = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
    const borderConfig = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

    function criatSecTitle(txt) {
        return new Paragraph({
            spacing: { before: 180, after: 60 },
            children: [
                new TextRun({ text: '▸ ', size: 22, font: 'Trebuchet MS', color: 'e040fb', bold: true }),
                new TextRun({ text: txt.toUpperCase(), bold: true, size: 22, font: 'Trebuchet MS', color: '1a1a2e' }),
            ]
        });
    }

    // Coluna esquerda
    const leftParagraphs = [];
    if (d.objetivo) {
        leftParagraphs.push(criatSecTitle('Objetivo'));
        leftParagraphs.push(new Paragraph({
            spacing: { before: 60, after: 40 },
            children: [new TextRun({ text: d.objetivo, size: 19, font: 'Calibri', color: '333333' })]
        }));
    }
    if (d.habilidades.length > 0) {
        leftParagraphs.push(criatSecTitle('Habilidades'));
        d.habilidades.forEach(h => {
            leftParagraphs.push(new Paragraph({
                spacing: { before: 50, after: 20 },
                shading: { fill: 'f3e5f5', type: ShadingType.CLEAR },
                children: [new TextRun({ text: '  ' + h + '  ', size: 19, font: 'Calibri', color: '6a0080', bold: true })]
            }));
        });
    }

    // Coluna direita
    const rightParagraphs = [];
    if (d.experiencias.length > 0) {
        rightParagraphs.push(criatSecTitle('Experiência'));
        d.experiencias.forEach((exp, i) => {
            if (i > 0) rightParagraphs.push(paragrafoVazio(60));
            rightParagraphs.push(new Paragraph({
                spacing: { before: 80, after: 20 },
                children: [new TextRun({ text: exp.empresa || '', bold: true, size: 21, font: 'Calibri', color: '1a1a2e' })]
            }));
            if (exp.cargo || exp.periodo) {
                rightParagraphs.push(new Paragraph({
                    spacing: { before: 0, after: 20 },
                    children: [
                        new TextRun({ text: exp.cargo || '', size: 19, font: 'Calibri', italics: true, color: 'e040fb' }),
                        new TextRun({ text: exp.periodo ? '   ' + exp.periodo : '', size: 17, font: 'Calibri', color: '999999' }),
                    ]
                }));
            }
            if (exp.descricao) {
                rightParagraphs.push(new Paragraph({
                    spacing: { before: 20, after: 40 },
                    children: [new TextRun({ text: exp.descricao, size: 19, font: 'Calibri', color: '444444' })]
                }));
            }
        });
    }
    if (d.formacoes.length > 0) {
        rightParagraphs.push(criatSecTitle('Formação'));
        d.formacoes.forEach((f, i) => {
            if (i > 0) rightParagraphs.push(paragrafoVazio(40));
            rightParagraphs.push(new Paragraph({
                spacing: { before: 80, after: 20 },
                children: [new TextRun({ text: f.curso || '', bold: true, size: 21, font: 'Calibri', color: '1a1a2e' })]
            }));
            rightParagraphs.push(new Paragraph({
                spacing: { before: 0, after: 20 },
                children: [
                    new TextRun({ text: f.nivel ? f.nivel + '   ' : '', size: 19, font: 'Calibri', italics: true, color: 'e040fb' }),
                    new TextRun({ text: [f.instituicao, f.periodo].filter(Boolean).join('   |   '), size: 17, font: 'Calibri', color: '999999' }),
                ]
            }));
        });
    }

    if (leftParagraphs.length === 0) leftParagraphs.push(paragrafoVazio());
    if (rightParagraphs.length === 0) rightParagraphs.push(paragrafoVazio());

    const bodyRow = new TableRow({
        children: [
            new TableCell({
                width: { size: colW, type: WidthType.DXA },
                margins: { top: 60, bottom: 60, left: 0, right: 280 },
                borders: { ...borderConfig, right: { style: BorderStyle.SINGLE, size: 4, color: 'eeeeee', space: 1 } },
                children: leftParagraphs
            }),
            new TableCell({
                width: { size: colW, type: WidthType.DXA },
                margins: { top: 60, bottom: 60, left: 280, right: 0 },
                borders: borderConfig,
                children: rightParagraphs
            }),
        ]
    });

    children.push(new Table({
        width: { size: CONTENT_W, type: WidthType.DXA },
        columnWidths: [colW, colW],
        rows: [bodyRow],
        borders: {
            top: noBorder, bottom: noBorder, left: noBorder, right: noBorder,
            insideH: noBorder, insideV: noBorder,
        }
    }));

    const doc = new Document({
        sections: [{
            properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 } } },
            children
        }]
    });
    return await Packer.toBuffer(doc);
}
