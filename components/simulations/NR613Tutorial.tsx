"use client";

import { useState, useEffect } from "react";
import { Calculator, ClipboardCheck, BookOpen, ChevronDown } from "lucide-react";

const ALPHA: Record<string, number> = { A: 1.5, B: 2.0, C: 1.5 };

type CalcState = {
  method: string;
  ct: number;
  cv: number;
  cf: number;
  ctheta: number;
  cb: number;
  ldesign: number;
};

const DEFAULT: CalcState = {
  method: "A",
  ct: 1.2,
  cv: 1.2,
  cf: 1.25,
  ctheta: 1.0,
  cb: 1.15,
  ldesign: 1000,
};

export function NR613Tutorial() {
  const [calc, setCalc] = useState<CalcState>(DEFAULT);
  const [result, setResult] = useState<{ sf: number; freq: number } | null>(null);
  const [checklistText, setChecklistText] = useState("");
  const [showChecklist, setShowChecklist] = useState(false);

  function set<K extends keyof CalcState>(key: K, value: CalcState[K]) {
    setCalc((prev) => ({ ...prev, [key]: value }));
  }

  function calculate() {
    const sf =
      ALPHA[calc.method] * calc.ct * calc.cv * calc.cf * calc.ctheta * calc.cb;
    const freq = calc.ldesign * sf;
    setResult({ sf, freq });
  }

  useEffect(() => {
    calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function generateChecklist() {
    const txt = [
      "CHECKLIST - Projeto junta adesiva (NR613)",
      "1) Descrição do assembly: função, localização, materiais, cargas.",
      "2) Definir Safety Class (SC) e maturidade / Qualification level (Q).",
      "3) Escolher método de justificação (A / B / C) e justificar.",
      "4) Especificação de bonding: espessura adesiva, preparação de superfície, primers.",
      "5) MTI Bonding Plan: armazenamento, pot-life, temperatura/humidade, rastreabilidade.",
      "6) Plano de ensaios: caracterização do adesivo (Tg, E, resistência), testes de junta representativos, envelhecimento/fadiga se aplicável.",
      "7) Procedimentos de fabricação: instruções, NDT, inspeção final.",
      "8) Registros: lotes, condições ambientais, ensaios e relatórios para submissão.",
    ].join("\n");
    setChecklistText(txt);
    setShowChecklist(true);
  }

  const labelClass =
    "block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1 mt-3";
  const inputClass =
    "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-text bg-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/40";
  const selectClass = inputClass;

  const STEPS = [
    {
      title: "1. Definir escopo & classe de segurança (SC)",
      body: "Descreva função, localização a bordo, cargas e condições ambientais. (NR613 - metodologia e especificação).",
    },
    {
      title: "2. Determinar maturidade & nível de qualificação Q",
      body: "Escolha Q1–Q5 com base na maturidade do projeto e segurança. (NR613 - Tab. requisitos).",
    },
    {
      title: "3. Preparar Bonding Specification & Design File",
      body: "Desenhos, espessura(s) previstas, processos, preparação de superfície, e critérios de aceitação.",
    },
    {
      title: "4. Selecionar método de justificação",
      body: "Method A (testes), B (cálculos), C (cálculos + testes). Cada um tem requisitos e fatores específicos.",
    },
    {
      title: "5. Planejar ensaios e MTI Bonding Plan",
      body: "Montar plano de fabricação, ensaios (caracterização/idade/fadiga conforme Q) e rastreabilidade.",
    },
    {
      title: "6. Produção, inspeção NDT e validação",
      body: "Fazer controles ambientais, final checks, NDT, e documentar para submissão.",
    },
  ];

  return (
    <div className="bg-[#f6f8fb] text-[#0b2545]">
      {/* Header */}
      <header
        className="px-4 py-5 text-white sm:px-6"
        style={{ background: "linear-gradient(90deg,#0b3b6f,#1b9be0)" }}
      >
        <h2 className="text-lg font-bold">
          Tutorial interativo: projeto de junta adesiva conforme NR613
        </h2>
        <p className="mt-1 text-sm text-blue-100">Standalone · client-side · Português (BR)</p>
      </header>

      <div className="mx-auto max-w-5xl p-4 sm:p-6">
        <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
          {/* Left column — tutorial content */}
          <div className="space-y-4">
            {/* Objective */}
            <section className="rounded-lg border border-[#e6eef7] bg-white p-5 shadow-sm">
              <h3 className="mb-3 flex items-center gap-2 text-base font-bold">
                <BookOpen className="h-4 w-4 text-blue-600" />
                Objetivo
              </h3>
              <p className="text-sm leading-relaxed">
                Este tutorial guia passo-a-passo o projeto de uma{" "}
                <strong>junta adesiva estrutural</strong> de acordo com a{" "}
                <strong>NR613 (Bonded Assemblies)</strong>. Inclui: definição do escopo, seleção do
                método de justificação (A/B/C), verificação de fatores de segurança, requisitos de
                ensaios, controle de fabricação (MTI Bonding Plan) e preparação de superfície.
              </p>
              <p className="mt-2 text-xs text-blue-700">
                Os trechos desta orientação seguem a NR613 fornecida. Use este tutorial como
                checklist interativo; todas as decisões finais e submissões devem ser feitas
                conforme os requisitos da Sociedade de Classificação aplicável.
              </p>
            </section>

            {/* Steps */}
            <section className="rounded-lg border border-[#e6eef7] bg-white p-5 shadow-sm">
              <h3 className="mb-3 text-base font-bold">Fluxo resumido (Passo a passo)</h3>
              <ul className="space-y-2">
                {STEPS.map((s) => (
                  <li
                    key={s.title}
                    className="border-l-4 border-[#d6e9ff] bg-gradient-to-r from-white to-[#fbfdff] p-3"
                  >
                    <p className="text-sm font-bold">{s.title}</p>
                    <p className="mt-0.5 text-xs text-[#375d81]">{s.body}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-[#3a5f86]">
                Fonte: NR613 - Sec 2 e Sec 5.
              </p>
            </section>

            {/* Design recommendations */}
            <section className="rounded-lg border border-[#e6eef7] bg-white p-5 shadow-sm">
              <h3 className="mb-3 text-base font-bold">
                Design da junta — recomendações práticas
              </h3>
              <p className="mb-3 text-xs text-[#315d88]">Pontos de atenção segundo NR613:</p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {[
                  "Priorizar carregamento em cisalhamento no plano",
                  "Evitar peel / modo I local (desenhar transições suaves)",
                  "Definir faixa de espessura do adesivo e tolerâncias",
                  "Considerar coeficiente de dilatação térmica",
                ].map((chip) => (
                  <div
                    key={chip}
                    className="rounded-md border border-[#cfe4ff] bg-[#eaf5ff] px-3 py-2 text-xs"
                  >
                    {chip}
                  </div>
                ))}
                <div className="col-span-1 rounded-md border border-[#cfe4ff] bg-[#eaf5ff] px-3 py-2 text-xs sm:col-span-2">
                  Juntas frágeis → preferir validação por ensaios (Method C / A).
                </div>
              </div>
            </section>

            {/* Surface prep */}
            <section className="rounded-lg border border-[#e6eef7] bg-white p-5 shadow-sm">
              <h3 className="mb-3 text-base font-bold">Preparação de superfície (resumo)</h3>
              <ol className="list-decimal space-y-1 pl-5 text-sm">
                <li>Limpeza e desengraxe;</li>
                <li>Abrasão adequada ao substrato (areia, lixa, bristle, etc);</li>
                <li>Limpeza final; aplicar primer se indicado pelo fabricante;</li>
                <li>Registrar lote/batch de produtos usados e resultados de ensaios de aderência.</li>
              </ol>
              <p className="mt-2 text-xs text-[#315d88]">
                Métodos de verificação citados na NR613: medição de molhabilidade (NF EN 828),
                wetting tension (ASTM D2578), e teste pull-off.
              </p>
            </section>

            {/* Tests */}
            <section className="rounded-lg border border-[#e6eef7] bg-white p-5 shadow-sm">
              <h3 className="mb-3 text-base font-bold">Ensaios e caracterização</h3>
              <p className="mb-2 text-xs text-[#315d88]">
                Seleção típica de ensaios (conforme Q e método):
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {[
                  "Caracterização adesivo: Tg, módulo, resistência tração/cisalhamento (ISO/ASTM listados)",
                  "Ensaios de junta: SLJ, TAST, ENF, DCB, peel, conforme objetivo",
                  "Envelhecimento e fadiga (Q4/Q5 ou conforme exigência)",
                  "Ensaios representativos em escala média/grande para Method A/C",
                ].map((chip) => (
                  <div
                    key={chip}
                    className="rounded-md border border-[#cfe4ff] bg-[#eaf5ff] px-3 py-2 text-xs"
                  >
                    {chip}
                  </div>
                ))}
              </div>
            </section>

            {/* MTI Bonding Plan */}
            <section className="rounded-lg border border-[#e6eef7] bg-white p-5 shadow-sm">
              <h3 className="mb-3 text-base font-bold">MTI Bonding Plan — pontos essenciais</h3>
              <p className="text-sm leading-relaxed">
                O MTI Bonding Plan deve cobrir desde compra e armazenamento dos adesivos até
                aplicação, cura, NDT e rastreabilidade (lotes, temperatura, humidade, tempo entre
                operações).
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                <li>Lista de materiais e ferramentas;</li>
                <li>Controle de armazenamento e vida útil;</li>
                <li>Procedimentos de mistura/dosagem e pot-life;</li>
                <li>Controles ambientais na aplicação;</li>
                <li>Critérios de aceitação e planilha de registo.</li>
              </ul>
            </section>

            {/* Checklist export */}
            <section className="rounded-lg border border-[#e6eef7] bg-white p-5 shadow-sm">
              <h3 className="mb-2 flex items-center gap-2 text-base font-bold">
                <ClipboardCheck className="h-4 w-4 text-blue-600" />
                Exportar / copiar checklist
              </h3>
              <p className="mb-3 text-xs text-[#315d88]">
                Você pode copiar o checklist abaixo:
              </p>
              <button
                onClick={generateChecklist}
                className="rounded-lg bg-[#0b60b0] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#0a52a0]"
              >
                Gerar checklist (selecionável)
              </button>
              {showChecklist && (
                <textarea
                  readOnly
                  value={checklistText}
                  className="mt-3 h-32 w-full rounded-lg border border-[#cfe1f6] p-3 font-mono text-xs text-[#0b2545] focus:outline-none"
                  onClick={(e) => (e.target as HTMLTextAreaElement).select()}
                />
              )}
            </section>
          </div>

          {/* Right column — calculator */}
          <aside className="space-y-4">
            <div className="rounded-lg border border-[#e6eef7] bg-white p-5 shadow-sm">
              <h3 className="mb-1 flex items-center gap-2 text-base font-bold">
                <Calculator className="h-4 w-4 text-blue-600" />
                Calculadora de Fator de Segurança
              </h3>
              <p className="text-xs text-[#315d88]">
                Fórmula NR613: SF ≥ α · Ct · Cv · CF · Cθ · Cb
              </p>

              <label className={labelClass}>Método de justificação</label>
              <select
                className={selectClass}
                value={calc.method}
                onChange={(e) => set("method", e.target.value)}
              >
                <option value="A">Method A — testes (α = 1.5)</option>
                <option value="B">Method B — cálculos (α = 2.0)</option>
                <option value="C">Method C — cálculos + testes (α = 1.5)</option>
              </select>

              <label className={labelClass}>Ct (critério de falha)</label>
              <select
                className={selectClass}
                value={calc.ct}
                onChange={(e) => set("ct", parseFloat(e.target.value))}
              >
                <option value="1.2">1.2 (falha por ensaio - Method A/C)</option>
                <option value="1.5">1.5 (uso de datasheet - Method B)</option>
              </select>

              <label className={labelClass}>Cv (ageing)</label>
              <select
                className={selectClass}
                value={calc.cv}
                onChange={(e) => set("cv", parseFloat(e.target.value))}
              >
                <option value="1.0">1.0 (não protegido / justificar)</option>
                <option value="1.2">1.2 (protegido — recomendação NR613)</option>
              </select>

              <label className={labelClass}>CF (processo)</label>
              <select
                className={selectClass}
                value={calc.cf}
                onChange={(e) => set("cf", parseFloat(e.target.value))}
              >
                <option value="1.25">1.25 (manual)</option>
                <option value="1.15">1.15 (vácuo/infusão/injection)</option>
              </select>

              <label className={labelClass}>Cθ (temperatura)</label>
              <select
                className={selectClass}
                value={calc.ctheta}
                onChange={(e) => set("ctheta", parseFloat(e.target.value))}
              >
                <option value="1.0">
                  1.0 (testado nas temperaturas de serviço)
                </option>
                <option value="1.2">1.2 (dados deduzidos do datasheet)</option>
              </select>

              <label className={labelClass}>Cb (tipo de falha)</label>
              <select
                className={selectClass}
                value={calc.cb}
                onChange={(e) => set("cb", parseFloat(e.target.value))}
              >
                <option value="1.0">1.0 (ductil)</option>
                <option value="1.15">1.15 (brittle ou indefinido)</option>
              </select>

              <label className={labelClass}>Carga máxima de projeto (N)</label>
              <input
                type="number"
                className={inputClass}
                value={calc.ldesign}
                onChange={(e) => set("ldesign", parseFloat(e.target.value) || 0)}
              />

              <button
                onClick={calculate}
                className="mt-4 w-full rounded-lg bg-[#0b60b0] py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#0a52a0]"
              >
                Calcular SF e Carga característica
              </button>

              {result && (
                <div className="mt-4 rounded-lg border border-[#d0e8ff] bg-[#eef7ff] p-4">
                  <p className="text-sm">
                    <strong>SF mínimo calculado:</strong>{" "}
                    <span className="font-mono text-base font-bold text-[#0b3b6f]">
                      {result.sf.toFixed(3)}
                    </span>
                  </p>
                  <p className="mt-2 text-sm">
                    <strong>F&#x2090;&#x1D0E;&#x1D21; requerida:</strong>{" "}
                    <span className="font-mono text-base font-bold text-[#0b3b6f]">
                      {result.freq.toFixed(1)} N
                    </span>
                  </p>
                  <p className="mt-2 text-xs text-[#315d88]">
                    Interprete F&#x2090;&#x1D0E;&#x1D21; conforme o método selecionado (ex.: para
                    Method A realize ensaios; para Method C ajuste com correlação experimental).
                  </p>
                </div>
              )}

              <details className="mt-4">
                <summary className="flex cursor-pointer items-center justify-between rounded-md bg-[#f0f6fb] px-3 py-2 text-sm font-semibold">
                  Como usar
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </summary>
                <p className="mt-2 text-xs text-[#375d81]">
                  Escolha o método e fatores, insira Ldesign (N). O script calcula SF mínimo e a
                  carga característica mínima (Freq) que a junta deve demonstrar (por teste ou
                  predição) para satisfazer SF.
                </p>
              </details>
            </div>

            {/* Pre-submission checklist */}
            <div className="rounded-lg border border-[#e6eef7] bg-white p-5 shadow-sm">
              <h3 className="mb-2 text-sm font-bold">
                Checklist rápida antes de enviar à Sociedade
              </h3>
              <ul className="space-y-1.5 text-xs text-[#375d81]">
                <li>✓ Bonding specification completa (descrição, função, localização).</li>
                <li>✓ Design file com desenhos e espessura(s).</li>
                <li>✓ MTI Bonding Plan com rastreabilidade e critérios.</li>
                <li>✓ Plano de ensaios / caracterização do adesivo.</li>
                <li>✓ Registros de preparação de superfície e NDT.</li>
              </ul>
            </div>

            {/* Advanced note */}
            <div className="rounded-lg border border-[#e6eef7] bg-white p-5 shadow-sm">
              <h3 className="mb-2 text-sm font-bold">Notas / Avançado</h3>
              <p className="text-xs text-[#375d81]">
                Para Method C: você precisa de campanha experimental (mínimo 4 configurações, ≥5
                espécimes cada) e análise de correlação b, COV e βC conforme NR613
                (EN1990-based). Veja App 4 e §2.4.
              </p>
            </div>
          </aside>
        </div>

        {/* References */}
        <section className="mt-5 rounded-lg border border-[#e6eef7] bg-white p-5 shadow-sm">
          <h3 className="mb-3 text-base font-bold">Referências (trechos NR613 usados)</h3>
          <ul className="space-y-1.5 text-xs text-[#3a5f86]">
            <li>Metodologia e etapas de avaliação: NR613 Sec 2.</li>
            <li>MTI Bonding Plan — conteúdo e exigências: NR613 Sec 5 e Appendix 6.</li>
            <li>
              Preparação de superfície — limpeza, abrasão, testes de molhabilidade: NR613 Sec 5
              (4.3.2) e App 7.
            </li>
            <li>Métodos de justificação: Method A, B, C e requisitos (2.2–2.4).</li>
            <li>
              Fatores de segurança e fórmula (SF ≥ α·Ct·Cv·CF·Cθ·Cb): NR613 Sec 3.
            </li>
            <li>
              Ensaios e caracterização (Tg, módulos, DCB/ENF/TAST/SLJ...): NR613 Sec 3 e App 4.
            </li>
          </ul>
          <p className="mt-3 text-xs italic text-[#315d88]">
            Use estas referências no envio de documentação à Sociedade de Classificação.
          </p>
        </section>
      </div>
    </div>
  );
}
