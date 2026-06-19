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
      "CHECKLIST - Bonded joint design (NR613)",
      "1) Assembly description: function, location, materials, loads.",
      "2) Define Safety Class (SC) and maturity / Qualification level (Q).",
      "3) Select justification method (A / B / C) and provide rationale.",
      "4) Bonding specification: adhesive thickness, surface preparation, primers.",
      "5) MTI Bonding Plan: storage, pot-life, temperature/humidity, traceability.",
      "6) Test plan: adhesive characterization (Tg, E, strength), representative joint tests, aging/fatigue if applicable.",
      "7) Manufacturing procedures: instructions, NDT, final inspection.",
      "8) Records: batches, environmental conditions, tests, and reports for submission.",
    ].join("\n");
    setChecklistText(txt);
    setShowChecklist(true);
  }

  const labelClass =
    "block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1 mt-3";
  // text-base (16px) prevents iOS auto-zoom on input/select focus
  const inputClass =
    "w-full rounded-lg border border-slate-200 px-3 py-2.5 text-base sm:text-sm text-text bg-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/40";
  const selectClass = inputClass;

  const STEPS = [
    {
      title: "1. Define scope & safety class (SC)",
      body: "Describe function, onboard location, loads, and environmental conditions. (NR613 - methodology and specification).",
    },
    {
      title: "2. Determine maturity & qualification level Q",
      body: "Choose Q1–Q5 based on design maturity and safety. (NR613 - requirements table).",
    },
    {
      title: "3. Prepare Bonding Specification & Design File",
      body: "Drawings, planned adhesive thickness(es), processes, surface preparation, and acceptance criteria.",
    },
    {
      title: "4. Select justification method",
      body: "Method A (tests), B (analysis), C (analysis + tests). Each has specific requirements and factors.",
    },
    {
      title: "5. Plan testing and MTI Bonding Plan",
      body: "Assemble manufacturing plan, tests (characterization/aging/fatigue per Q), and traceability.",
    },
    {
      title: "6. Production, NDT inspection and validation",
      body: "Perform environmental controls, final checks, NDT, and document for submission.",
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
          Interactive tutorial: bonded joint design according to NR613
        </h2>
        <p className="mt-1 text-sm text-blue-100">Standalone · client-side · English</p>
      </header>

      <div className="mx-auto max-w-5xl p-4 sm:p-6">
        <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
          {/* Left column — tutorial content (order-last on mobile so calculator appears first) */}
          <div className="order-last space-y-4 lg:order-first">
            {/* Objective */}
            <section className="rounded-lg border border-[#e6eef7] bg-white p-5 shadow-sm">
              <h3 className="mb-3 flex items-center gap-2 text-base font-bold">
                <BookOpen className="h-4 w-4 text-blue-600" />
                Objective
              </h3>
              <p className="text-sm leading-relaxed">
                This tutorial guides a step-by-step design of a <strong>structural bonded joint</strong> in accordance with <strong>NR613 (Bonded Assemblies)</strong>. It includes scope definition, selection of justification method (A/B/C), safety factor checks, test requirements, manufacturing control (MTI Bonding Plan), and surface preparation.
              </p>
              <p className="mt-2 text-xs text-blue-700">
                The guidance excerpts follow the provided NR613. Use this tutorial as an interactive checklist; final decisions and submissions must comply with the applicable Classification Society requirements.
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
                Joint design — practical recommendations
              </h3>
              <p className="mb-3 text-xs text-[#315d88]">NR613 key design considerations:</p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {[
                  "Favor in-plane shear loading",
                  "Avoid local peel / mode I (use smooth transitions)",
                  "Define adhesive thickness range and tolerances",
                  "Consider thermal expansion coefficient",
                ].map((chip) => (
                  <div
                    key={chip}
                    className="rounded-md border border-[#cfe4ff] bg-[#eaf5ff] px-3 py-2 text-xs"
                  >
                    {chip}
                  </div>
                ))}
                <div className="col-span-1 rounded-md border border-[#cfe4ff] bg-[#eaf5ff] px-3 py-2 text-xs sm:col-span-2">
                  Brittle joints → prefer validation by tests (Method C / A).
                </div>
              </div>
            </section>

            {/* Surface prep */}
            <section className="rounded-lg border border-[#e6eef7] bg-white p-5 shadow-sm">
              <h3 className="mb-3 text-base font-bold">Surface preparation (summary)</h3>
              <ol className="list-decimal space-y-1 pl-5 text-sm">
                <li>Cleaning and degreasing;</li>
                <li>Substrate-appropriate abrasion (sand, grit, bristle, etc.);</li>
                <li>Final cleaning; apply primer if recommended by the manufacturer;</li>
                <li>Record batch numbers of materials used and adhesion test results.</li>
              </ol>
              <p className="mt-2 text-xs text-[#315d88]">
                Verification methods cited in NR613: wettability measurement (NF EN 828), wetting tension (ASTM D2578), and pull-off testing.
              </p>
            </section>

            {/* Tests */}
            <section className="rounded-lg border border-[#e6eef7] bg-white p-5 shadow-sm">
              <h3 className="mb-3 text-base font-bold">Testing and characterization</h3>
              <p className="mb-2 text-xs text-[#315d88]">
                Typical test selection (per Q and method):
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {[
                  "Adhesive characterization: Tg, modulus, tensile/shear strength (ISO/ASTM listed)",
                  "Joint tests: SLJ, TAST, ENF, DCB, peel, per objective",
                  "Aging and fatigue (Q4/Q5 or as required)",
                  "Representative medium/large scale tests for Method A/C",
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
              <h3 className="mb-3 text-base font-bold">MTI Bonding Plan — key points</h3>
              <p className="text-sm leading-relaxed">
                The MTI Bonding Plan should cover adhesive purchase and storage through application, cure, NDT and traceability (batches, temperature, humidity, time between operations).
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                <li>List of materials and tools;</li>
                <li>Storage control and shelf life;</li>
                <li>Mixing/dosing procedures and pot-life;</li>
                <li>Environmental controls during application;</li>
                <li>Acceptance criteria and record sheet.</li>
              </ul>
            </section>

            {/* Checklist export */}
            <section className="rounded-lg border border-[#e6eef7] bg-white p-5 shadow-sm">
              <h3 className="mb-2 flex items-center gap-2 text-base font-bold">
                <ClipboardCheck className="h-4 w-4 text-blue-600" />
                Export / copy checklist
              </h3>
              <p className="mb-3 text-xs text-[#315d88]">
                You can copy the checklist below:
              </p>
              <button
                onClick={generateChecklist}
                className="rounded-lg bg-[#0b60b0] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0a52a0]"
              >
                Generate checklist (selectable)
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

          {/* Right column — calculator (order-first on mobile so it shows above tutorial text) */}
          <aside className="order-first space-y-4 lg:order-last">
            <div className="rounded-lg border border-[#e6eef7] bg-white p-5 shadow-sm">
              <h3 className="mb-1 flex items-center gap-2 text-base font-bold">
                <Calculator className="h-4 w-4 text-blue-600" />
                Safety Factor Calculator
              </h3>
              <p className="text-xs text-[#315d88]">
                NR613 formula: SF ≥ α · Ct · Cv · CF · Cθ · Cb
              </p>

              <label className={labelClass}>Justification method</label>
              <select
                className={selectClass}
                value={calc.method}
                onChange={(e) => set("method", e.target.value)}
              >
                <option value="A">Method A — testes (α = 1.5)</option>
                <option value="B">Method B — cálculos (α = 2.0)</option>
                <option value="C">Method C — cálculos + testes (α = 1.5)</option>
              </select>

              <label className={labelClass}>Ct (failure criterion)</label>
              <select
                className={selectClass}
                value={calc.ct}
                onChange={(e) => set("ct", parseFloat(e.target.value))}
              >
                <option value="1.2">1.2 (test failure - Method A/C)</option>
                <option value="1.5">1.5 (datasheet use - Method B)</option>
              </select>

              <label className={labelClass}>Cv (ageing)</label>
              <select
                className={selectClass}
                value={calc.cv}
                onChange={(e) => set("cv", parseFloat(e.target.value))}
              >
                <option value="1.0">1.0 (unprotected / justify)</option>
                <option value="1.2">1.2 (protected — NR613 recommendation)</option>
              </select>

              <label className={labelClass}>CF (process)</label>
              <select
                className={selectClass}
                value={calc.cf}
                onChange={(e) => set("cf", parseFloat(e.target.value))}
              >
                <option value="1.25">1.25 (manual)</option>
                <option value="1.15">1.15 (vacuum/infusion/injection)</option>
              </select>

              <label className={labelClass}>Cθ (temperature)</label>
              <select
                className={selectClass}
                value={calc.ctheta}
                onChange={(e) => set("ctheta", parseFloat(e.target.value))}
              >
                <option value="1.0">
                  1.0 (tested at service temperatures)
                </option>
                <option value="1.2">1.2 (data inferred from datasheet)</option>
              </select>

              <label className={labelClass}>Cb (failure mode)</label>
              <select
                className={selectClass}
                value={calc.cb}
                onChange={(e) => set("cb", parseFloat(e.target.value))}
              >
                <option value="1.0">1.0 (ductile)</option>
                <option value="1.15">1.15 (brittle or undefined)</option>
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
                className="mt-4 w-full rounded-lg bg-[#0b60b0] py-3 text-sm font-bold text-white transition-colors hover:bg-[#0a52a0]"
              >
                Calculate SF and characteristic load
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
                    Interpret Freq according to the selected method (e.g., for Method A perform tests; for Method C adjust with experimental correlation).
                  </p>
                </div>
              )}

              <details className="mt-4">
                <summary className="flex min-h-[44px] cursor-pointer items-center justify-between rounded-md bg-[#f0f6fb] px-3 py-3 text-sm font-semibold">
                  How to use
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </summary>
                <p className="mt-2 text-xs text-[#375d81]">
                  Choose the method and factors, enter Ldesign (N). The script calculates minimum SF and the minimum characteristic load (Freq) that the joint must demonstrate (by test or prediction) to satisfy SF.
                </p>
              </details>
            </div>

            {/* Pre-submission checklist */}
            <div className="rounded-lg border border-[#e6eef7] bg-white p-5 shadow-sm">
              <h3 className="mb-2 text-sm font-bold">
                Quick checklist before submission to the Society
              </h3>
              <ul className="space-y-1.5 text-xs text-[#375d81]">
                <li>✓ Complete bonding specification (description, function, location).</li>
                <li>✓ Design file with drawings and thickness(es).</li>
                <li>✓ MTI Bonding Plan with traceability and criteria.</li>
                <li>✓ Test plan / adhesive characterization.</li>
                <li>✓ Records of surface preparation and NDT.</li>
              </ul>
            </div>

            {/* Advanced note */}
            <div className="rounded-lg border border-[#e6eef7] bg-white p-5 shadow-sm">
              <h3 className="mb-2 text-sm font-bold">Notes / Advanced</h3>
              <p className="text-xs text-[#375d81]">
                For Method C: you need an experimental campaign (minimum 4 configurations, ≥5 specimens each) and correlation analysis b, COV and βC per NR613 (EN1990-based). See App 4 and §2.4.
              </p>
            </div>
          </aside>
        </div>

        {/* References */}
        <section className="mt-5 rounded-lg border border-[#e6eef7] bg-white p-5 shadow-sm">
          <h3 className="mb-3 text-base font-bold">References (NR613 excerpts used)</h3>
          <ul className="space-y-1.5 text-xs text-[#3a5f86]">
            <li>Methodology and evaluation stages: NR613 Sec 2.</li>
            <li>MTI Bonding Plan — content and requirements: NR613 Sec 5 and Appendix 6.</li>
            <li>
              Surface preparation — cleaning, abrasion, wettability tests: NR613 Sec 5
              (4.3.2) and App 7.
            </li>
            <li>Justification methods: Method A, B, C and requirements (2.2–2.4).</li>
            <li>
              Safety factors and formula (SF ≥ α·Ct·Cv·CF·Cθ·Cb): NR613 Sec 3.
            </li>
            <li>
              Testing and characterization (Tg, moduli, DCB/ENF/TAST/SLJ...): NR613 Sec 3 and App 4.
            </li>
          </ul>
          <p className="mt-3 text-xs italic text-[#315d88]">
            Use these references when submitting documentation to the Classification Society.
          </p>
        </section>
      </div>
    </div>
  );
}
